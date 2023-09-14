const express = require("express");
const router = express.Router();
const tweetModel = require("../model/tweetModel");

module.exports = {

  async getTweets(req, res) {
    const userId  = req.user._id;

    console.log(userId)
  
    // Check if the user has any tweets.
    const tweets = await tweetModel.find({
      userId: userId,
      text: {
        $exists: true,
      },
    });

    console.log(tweets)
  
    // If the user does not have any tweets, return an empty array.
    if (!tweets || tweets.length === 0) {
      res.json([]);
      return;
    }
  
    res.status(200).json(tweets);
  },
  
  async createTweet(req, res) {
    console.log("Creating tweet !")
    const { text } = req.body;

    const tweet = new tweetModel({
      userId: req.user._id,
      text,
    });

    await tweet.save();

    res.status(201).json(tweet);
  },

  async updateTweet(req, res) {
    console.log("Updating tweet !")
    const { id } = req.params;
    const { text } = req.body;

    const tweet = await tweetModel.findById(id);

    if (!tweet) {
      res.status(404).json({ error: "Tweet not found" });
      return;
    }

    tweet.text = text;

    await tweet.save();

    res.status(200).json(tweet);
  },

  async deleteTweet(req, res) {
    console.log("Deleting tweet !")
    const { id } = req.params;

    const tweet = await tweetModel.findById(id);

    if (!tweet) {
      res.status(404).json({ error: "Tweet not found" });
      return;
    }

    await tweet.remove();

    res.status(200).json({});
  },

  async likeTweet(req, res) {
    console.log("Like Or dislike tweet depedning on current status of (isLiked)!");
    const { id } = req.params;
  
    const tweet = await tweetModel.findById(id);
  
    if (!tweet) {
      res.status(404).json({ error: "Tweet not found" });
      return;
    }
  
    const user = req.user;
  
    // Check if the user has already liked the tweet
    const userIndex = tweet.likes.findIndex((like) => like.userId.toString() === user._id.toString());
  
    if (userIndex !== -1) {
      // If the user has already liked the tweet, remove the like
      tweet.likes.splice(userIndex, 1);
      tweet.likeCount = tweet.likeCount - 1;
    } else {
      // If the user has not liked the tweet, add a like
      tweet.likeCount = tweet.likeCount + 1;
      tweet.likes.push({ userId: user._id });
    }
  
    await tweet.save();
  
    res.status(200).json({ liked: userIndex === -1 });
  },
  
  
};

