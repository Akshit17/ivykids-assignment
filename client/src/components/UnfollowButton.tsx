import React, { useState } from 'react';
import axios from 'axios';

const UnfollowButton: React.FC<{ userId: string }> = ({ userId }) => {
    const [isFollowing, setIsFollowing] = useState(true);
  
    const handleUnfollow = async () => {
      try {
        await axios.delete(`/followers/unfollow/${userId}`);
        setIsFollowing(false);
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleUnfollow}
        disabled={!isFollowing}
      >
        Unfollow
      </button>
    );
  };

  export default UnfollowButton