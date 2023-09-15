const express = require("express");
const router = express.Router();

const followersModel = require("../model/followersModel");
const tweetModel = require("../model/tweetModel");

module.exports = {
  // Get list of followers
  async getFollowers(req, res) {
    console.log("Entered here")
    const user = req.user;
    console.log(user)

    const followers = await followersModel.find({ followingUserId: user.id });
    
    console.log(followers)
    // If the user has no followers, return an empty array.
    if (!followers) {
      res.json([]);
      return;
    }

    res.json(followers);
  },
  // Get list of following
  async getFollowing(req, res) {
    const user = req.user;

    const following = await followersModel.find({ followerUserId: user.id });

    // If the user is not following anyone, return an empty array.
    if (!following) {
      res.json([]);
      return;
    }

    res.json(following);
  },

  //Gte tweets from following userIds
  async getTimeline(req, res) {
    const user = req.user;
    
    const followedUsers = await followersModel.find({ followerUserId: user._id });
    const tweetIds = followedUsers.map((user) => user.followingUserId);
    
    const tweets = await tweetModel.find({ userId: { $in: tweetIds } });
    // Sort the tweets by their createdAt field in descending order.
    tweets.sort((a, b) => b.createdAt - a.createdAt);

    res.json(tweets);
  },


  async follow(req, res) {
    console.log("Entered here")
    const { userId } = req.params;

    const user = req.user;

    const follower = await followersModel.findOne({
      followerUserId: user.id,
      followingUserId: userId,
    });

    if (follower) {
      res.status(400).json({ error: "You are already following this user" });
      return;
    }

    const newFollower = new followersModel({
      followerUserId: user.id,
      followingUserId: userId,
    });

    await newFollower.save();

    res.status(201).json(newFollower);
  },

  async unfollow(req, res) {
    const user = req.user;
    const { userId } = req.params;
  
    const follower = await followersModel.findOneAndDelete({
      followerUserId: user.id,
      followingUserId: userId,
    });
  
    if (!follower) {
      res.status(400).json({ error: "You are not following this user" });
      return;
    }
  
    res.status(200).json({});
  },
  
};
