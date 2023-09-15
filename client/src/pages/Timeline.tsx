// ProtectedRoute.tsx

import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserVerification } from "../hooks/useUserVerification";

import { toast, ToastContainer } from "react-toastify";
import { RingLoader } from "react-spinners"; 
import LogOutButton from "../components/LogOutButton";
import TweetFeed from "../components/TweetFeed";
import UsersFeed from "../components/UsersFeed";
import CreateTweetButton from "../components/CreateTweetButton";
import { Link } from "react-router-dom";

export const Timeline: React.FC = () => {
  const navigate = useNavigate();

  const {user, isToken} = useUserVerification();

  console.log('User :- ', user)
  console.log('isToken :- ', isToken)
 
  // useEffect(() => {
  //   if (!isToken) {
  //     navigate("/login");
  //   } else {
  //     console.log(user?._id);
  //     toast(`Welcome ${user?._id} !!🦄`, {
  //       theme: "dark",
  //     });
  //   }
  // }, []);

  if (!isToken) {
        navigate("/login");
      } else {
        console.log(user?._id);
        toast(`Welcome ${user?._id} !!🦄`, {
          theme: "dark",
        });
  }
  
  // const isToken = true;
  return (
    isToken ?
      <>
          <div className="flex flex-col min-h-screen">
            <header className="flex items-center justify-between bg-white border-b border-gray-200 py-4 px-6">
              <h1 className="font-semibold text-gray-900">Main Timeline</h1>
              <LogOutButton />
            </header>

            <main className="flex flex-row flex-wrap">
              <aside className="flex flex-col w-1/4 p-6">
                <div className="flex items-center">
                  <img src="/logo.png" alt="Logo" className="w-12 h-12 mr-4" />
                  <Link to="/profile" className="text-gray-900">Profile</Link>
                </div>

                <CreateTweetButton />

                {/* <UsersFeed /> */}
              </aside>

              <div className="flex flex-col w-3/4 p-6">
                <TweetFeed />
              </div>
            </main>
          </div>

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
};
