import React, { useState } from 'react';
import axios from 'axios';

const CreateTweetButton: React.FC = () => {
    const [tweetText, setTweetText] = useState('');
  
    const handleTweetSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        console.log("AAAJAJAJAJA")
        const response = await axios.post('http://localhost:4000/tweets/', { text: tweetText }, 
        {
          withCredentials: true,
        });
        console.log(response)
        setTweetText('');
      } catch (error) {
        console.log(error);
      }

    };
  
    return (
      <form onSubmit={(e) => handleTweetSubmit(e)}>
        <input
          type="text"
          placeholder="Write a tweet..."
          value={tweetText}
          onChange={(e) => setTweetText(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Tweet
        </button>
      </form>
    );
  };

  export default CreateTweetButton