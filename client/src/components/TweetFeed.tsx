// TweetFeed.tsx

import React, { useState, useEffect } from "react";
import Tweet from "./Tweet";
import axios from "axios";
import { TweetType } from "../types/tweet.types";

interface TweetFeedProps {}

const TweetFeed: React.FC<TweetFeedProps> = () => {
  const [tweets, setTweets] = useState<TweetType[]>([]);

  useEffect(() => {
    // Fetch tweets from the `/followers/timeline` endpoint
    axios
      .get("http://localhost:4000/followers/timeline", 

      )
      .then((response) => setTweets(response.data.tweets));
  }, []);

  return (
    <div>
      {tweets?.map((tweet) => (
        <Tweet key={tweet._id} tweet={tweet} />
      ))}
    </div>
  );
};

export default TweetFeed;
