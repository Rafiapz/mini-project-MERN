import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import Login from "../components/Login/Login";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage({}) {



  return (
    <>
      <Header />
      <Login />
    </>
  );
}

export default LoginPage;
