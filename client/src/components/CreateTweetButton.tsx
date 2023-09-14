import React, { useState } from 'react';
import axios from 'axios';

const CreateTweetButton: React.FC = () => {
    const [tweetText, setTweetText] = useState('');
  
    const handleTweetSubmit = async () => {
      try {
        await axios.post('/tweets/', { text: tweetText });
        setTweetText('');
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <form onSubmit={handleTweetSubmit}>
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