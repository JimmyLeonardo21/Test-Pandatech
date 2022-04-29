import styled from "styled-components";
import { redirect_uri, scope, state } from "../constant";
const { REACT_APP_CLIENT_ID } = process.env;

const Login = () => {
  return (
    <Container>
      <a
        href={`https://accounts.spotify.com/authorize?response_type=code&client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}`}
      >
        <Button>Klik Here for Login</Button>
      </a>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  height: 100px;
  width: 300px;
  font-size: 30px;
  cursor: pointer;
  font-weight: 600;
  color: white;
  background-color: #64748b;
  /* background-image; url(${"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjvZCi-8kCAXw9HueRq88IzypqkZyJrcbAQA&usqp=CAU"}); */
  &:hover {
    color: rgba(255, 255, 255, 1);
    box-shadow: 0 5px 15px rgba(145, 92, 182, 0.4);
  }
`;
export default Login;
