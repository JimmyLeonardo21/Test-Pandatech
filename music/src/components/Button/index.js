import React from "react";
import styled from "styled-components";

const Button = ({ children, onClick }) => {
  return (
    <ButtonSearch
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </ButtonSearch>
  );
};

export default Button;
const ButtonSearch = styled.button`
  padding: 10px 40px;
  font-size: 18px;
  color: white;
  background: #1d4ac4;
  border-radius: 8px;
  cursor: pointer;
`;
