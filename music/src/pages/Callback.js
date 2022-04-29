import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { transformQuerytoObj } from "../helper";
import axios from "axios";
import { redirect_uri } from "../constant";
import { state } from "../constant";
import { Buffer } from "buffer";
const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;

function Callback() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const queryObj = transformQuerytoObj(location.search);
    if (!queryObj.state) return false;
    const path = "https://accounts.spotify.com/api/token";
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", queryObj.code);
    params.append("redirect_uri", redirect_uri);
    params.append("client_id", REACT_APP_CLIENT_ID);
    params.append("code_verifier", state);
    const decodedStringBtoA = `${REACT_APP_CLIENT_ID}:${REACT_APP_CLIENT_SECRET}`;
    const encodedStringBtoA = new Buffer(decodedStringBtoA).toString("base64");
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${encodedStringBtoA}`,
    };
    axios.post(path, params, { headers, json: true }).then(({ data }) => {
      const token = JSON.stringify(data);
      localStorage.setItem("token", token);
      navigate("/home");
    });
  }, []);
  return (
    <div>
      <h1>callback</h1>
    </div>
  );
}

export default Callback;
