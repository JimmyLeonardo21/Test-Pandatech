import styled from "styled-components";
import Navbar from "../components/Navbar";
import CardContent from "../components/Card";
import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { transformQuerytoObj } from "../helper";
import Button from "../components/Button";
import axios from "axios";
const localToken = localStorage.getItem("token");
const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParsed = useMemo(
    () => transformQuerytoObj(location.search),
    [location.search]
  );
  const [dataUser] = useState(JSON.parse(localToken));
  const [dataMusic, setDataMusic] = useState([]);
  const [pagination, setPagination] = useState({});
  const fetchData = () => {
    const q = queryParsed.q || "a";
    const config = {
      headers: { Authorization: `Bearer ${dataUser.access_token}` },
      "Content-Type": "application/json",
      params: { ...queryParsed, type: "track", q },
    };
    axios
      .get("https://api.spotify.com/v1/search", config)
      .then(({ data }) => {
        setPagination({
          total: data.tracks.total,
          next: data.tracks.next,
        });
        const list = queryParsed.offset
          ? [...dataMusic, ...data.tracks.items]
          : data.tracks.items;
        setDataMusic(list);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchData();
  }, [queryParsed]);
  const handleSearch = (querySearch) => {
    navigate(`/home?q=${querySearch}`);
  };
  const handleChangeLanguage = ({ value }) => {
    navigate(`/home?q=${queryParsed.q}&market=${value}`);
  };
  const handleLoadMore = () => {
    const offset = (+queryParsed.offset || 20) + 20;
    const off = dataMusic.length <= 20 ? 40 : offset;
    navigate(`/home?q=${queryParsed.q}&offset=${offset}`);
  };
  return (
    <>
      <Navbar
        handleChangeLanguage={handleChangeLanguage}
        queryParsed={queryParsed}
        handleSearch={handleSearch}
      />
      <Container>
        <ContainerContent>
          <Title>
            {pagination.total
              ? `${pagination.total} tracks di temukan`
              : "Tidak ada tracks yang ditemukan"}
          </Title>
          <Content>
            {dataMusic.map((data) => {
              return <CardContent key={data.id} data={data} />;
            })}
          </Content>
          {pagination.total > dataMusic.length && (
            <LoadMore>
              <Button onClick={handleLoadMore}>Load More</Button>
            </LoadMore>
          )}
        </ContainerContent>
      </Container>
    </>
  );
};

const Container = styled.div`
  background-color: #94a3b8;
  height: 100vh;
  overflow: scroll;
  padding: 50px;
`;
const ContainerContent = styled.div``;

const Title = styled.span`
  font-size: 30px;
`;

const Content = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  flex-direction: center;
  margin-top: 20px;
`;

const LoadMore = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
export default Home;
