import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const LogOutButton: React.FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  
  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  return (
    <button onClick={logOut}>Log out</button>
  );
};

export default LogOutButton
