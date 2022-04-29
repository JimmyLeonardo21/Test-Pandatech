import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Callback from "./pages/Callback";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
