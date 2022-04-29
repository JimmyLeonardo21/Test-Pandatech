import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";
import Button from "../Button";
import { languages } from "../../constant/index";
import outSideClick from "../../customHooks/OutsideClick";
const Navbar = ({ handleSearch, queryParsed, handleChangeLanguage }) => {
  const ref = useRef(null);
  const [search, setSearch] = useState(queryParsed.q);
  const [show, setShow] = useState(false);
  outSideClick(ref, () => setShow(false), show);
  return (
    <Container>
      <ContainerLogo>
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyOSazfpTUgWvO06Xbw7zImFEicERuh5Blhw&usqp=CAU"
          alt="error"
        ></Image>
        <Title>Music</Title>
      </ContainerLogo>
      <ContainerSearch>
        <DropDown onClick={() => setShow(true)} ref={ref}>
          {show && (
            <ListDropDown>
              {languages.map((el, i) => (
                <Item
                  onClick={() => handleChangeLanguage(el)}
                  last={i === languages.length - 1}
                  i={i}
                  key={el.value}
                >
                  {el.label}
                </Item>
              ))}
            </ListDropDown>
          )}
        </DropDown>
        <Search
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search"
        />
        <Button onClick={() => handleSearch(search)}>search</Button>
      </ContainerSearch>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  display: flex;
  background-color: #334155;
  align-items: center;
  flex-direction: space-around;
  padding: 10px;
`;

const ContainerLogo = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 10px;
  flex: 1;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
`;

const Title = styled.span`
  font-size: 30px;
  color: white;
  font-weight: 600;
`;

const Search = styled.input`
  width: 200px;
  height: 20px;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 8px;
`;

const ContainerSearch = styled.div`
  margin-right: 100px;
  display: flex;
  gap: 10px;
`;

const DropDown = styled.div`
  width: 40px;
  height: 20px;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 8px;
  background: white;
  margin-top: 3px;
  position: relative;
`;

const ListDropDown = styled.div`
  background: white;
  border-radius: 8px;
  position: absolute;
  top: 45px;
  right: 0px;
`;

const Item = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  transition: all ease 0.3s;
  font-size: 20px;
  :hover {
    background: #4272f5;
    color: white;
  }
  ${({ i }) =>
    i === 0 &&
    css`
      border-radius: 8px 8px 0 0;
    `}
  ${({ last }) =>
    last &&
    css`
      border-radius: 0px 0px 8px 8px;
    `}
`;
