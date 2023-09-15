import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { User } from "../types/user.types"
import { useNavigate } from "react-router-dom";

export function useUserVerification(): {
  user: User | null;
  isToken: boolean;
} {

  const [cookies, setCookie, removeCookie] = useCookies();
  const [user, setUser] = useState<User | null>(null);
  const [isToken, setIsToken] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        setIsToken(false);
        // what to do here?
      }
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        {
          withCredentials: true,
        }
      );

      console.log("Data :- ", data)

      if (!data.status) {
        removeCookie("jwt");
        // navigate("/login"); //cehcks
        // what to do here?
        setIsToken(false);
      } else {
        setUser(data.user);
        setIsToken(true);
      }
    };

    verifyUser();
  }, [cookies, removeCookie]);

  return { user, isToken };
}
