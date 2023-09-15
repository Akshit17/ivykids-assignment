// Tweet.tsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { TweetType } from "../types/tweet.types";
import { Link } from "react-router-dom";

interface TweetProps {
  tweet: TweetType;
}

const Tweet: React.FC<TweetProps> = (props) => {
  const tweet = props.tweet;

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Check if the tweet is liked by the logged-in user
    axios
      .get(`/tweets/like/${tweet._id}`)
      .then((response) => {
        setIsLiked(response.data.isLiked);
      });
  }, [tweet._id]);

  const handleLike = async () => {
    // Like or dislike the tweet depending on its current like status
    const response = await axios.post(`/tweets/like/${tweet._id}`);

    // Update the like status
    setIsLiked(response.data.isLiked);
  };

  return (
    <div className="flex flex-col border-b border-gray-200 p-6">
      <div className="flex items-center">
        <img src="./twitterLogo.png" alt="Avatar" className="w-8 h-8 mr-4 rounded-full" />
        {/* <Link to={`/profile/${tweet.userId}`} className="text-gray-900">
          {tweet.userId}
        </Link> */}
      </div>

      <p className="mt-2 text-gray-900">{tweet.text}</p>

      <div className="flex items-center mt-4">
        <button
          type="button"
          onClick={handleLike}
          className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          <i className={`fa-solid fa-thumbs-up ${isLiked ? "text-blue-500" : "text-gray-500"}`} />
        </button>

        {/* <EditButton tweetId={tweet._id} /> Only to be shown if the tweet is posted by logged in user itself */}
        
        {/* <DeleteButton tweetId={tweet._id} />  Only to be shown if the tweet is posted by logged in user itself*/}
      </div>
    </div>
  );
};

export default Tweet;
