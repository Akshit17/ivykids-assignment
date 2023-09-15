import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserVerification } from "../hooks/useUserVerification";

import { toast, ToastContainer } from "react-toastify";
import { RingLoader } from "react-spinners"; 
import LogOutButton from "../components/LogOutButton";
import TweetFeed from "../components/TweetFeed";
import UsersFeed from "../components/UsersFeed";

export const UserProfilePage: React.FC = () => {
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
          <h1>Main Timeline</h1>
          
          Logo of the app       {/* //In left side of webpage, render Logo of the app */}
          Profile               {/* //In left side of webpage (Consisting of link to profilePage(of logged in user) (says Profile with a profile icon) )  */}
          CreateTweetButton     {/* */}

          <TweetFeed />           {/* //In the middle of webpage (Tweet cards of tweets posted by users whom our logged in user follows)  */}
          
          <UsersFeed />           {/* // In the right side of webpage (List of all users in database as card consisting of followbutton to follow that user and onclicking their username link to that Users profilePage)*/}
          <LogOutButton />        {/* //In top right side top-right corner  */}
        </div>
      </>
      : (
        <div className="loader-container">
          {/* Loader */}
        </div>
      )
  );
};
