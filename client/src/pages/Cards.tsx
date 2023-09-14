import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { RingLoader } from "react-spinners"; 


export default function Cards() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [isToken, setisToken] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        setisToken(false);
        return navigate("/login");
      } 
      else {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } 
        else{
          toast(`Welcome ${data.user} !!🦄`, {
            theme: "dark",
          });
          setisToken(true);
        }
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    setisToken(false);
    removeCookie("jwt");
    navigate("/login");
  };

  return (
    isToken ?
    <>
      <div className="private">
        
        <h1>Super Secret Page</h1>

        <button onClick={logOut}>Log out</button>

      </div>

      <ToastContainer />
    </> 
    : (
      <div className="loader-container">
        <RingLoader
          // css={loaderStyle}
          size={250}
          color={"#000000"}
          loading={true}
        />
      </div>
    )

  );
}
