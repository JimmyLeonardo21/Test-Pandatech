import React from "react";
import styled from "styled-components";

const CardContent = ({ data }) => {
  return (
    <Container>
      <div>
        <img src={data?.album?.images[1]?.url} alt="error"></img>
      </div>
      <div>
        <span>{data.name}</span>
      </div>
      <div>
        <span>judul lagu</span>
      </div>
    </Container>
  );
};
export default CardContent;

const Container = styled.div``;
