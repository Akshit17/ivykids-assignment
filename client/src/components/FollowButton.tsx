import React, { useState } from 'react';
import axios from 'axios';

const FollowButton: React.FC<{ userId: string }> = ({ userId }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = async () => {
    try {
      await axios.post(`/followers/follow/${userId}`);
      setIsFollowing(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={handleFollow}
      disabled={isFollowing}
    >
      Follow
    </button>
  );
};


export default FollowButton