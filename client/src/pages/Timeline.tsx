// ProtectedRoute.tsx

import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOutButton } from "../components/LogOutButton";
import { useUserVerification } from "../hooks/useUserVerification";

import { toast, ToastContainer } from "react-toastify";
import { RingLoader } from "react-spinners"; 

export const ProtectedRoute: React.FC = () => {
  const navigate = useNavigate();
  const {user, isToken} = useUserVerification();

  useEffect(() => {
    if (!isToken) {
      navigate("/login");
    }else{
      console.log(user?._id)
        toast(`Welcome ${user?._id} !!🦄`, {
            theme: "dark",
          });
    }
  }, [isToken, navigate]);

  return (
    isToken ?
      <>
        <div className="private">
          <ToastContainer />
          <h1>Super Secret Page</h1>
          <Sidebar/>                //In left side (Consisting of link to profilePage(of logged in user) , Logo of the app) 
          <LogOutButton />         //In top right corner ( )
          <TweetFeed />            //In the middle  (Tweet cards of tweets posted by users whom our logged in user follows)
          <UsersFeed />            // In the right (List of all users in database as card consisting of followbutton to follow that user and onclicking their username link to that Users profilePage)
        </div>
      </>
      : (
        <div className="loader-container">
          {/* Loader */}
        </div>
      )
  );
};
