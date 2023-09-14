const express = require("express");
const router = express.Router();
const tweetModel = require("../model/tweetModel");

router.post("/", async (req, res) => {
  const { text } = req.body;

  const tweet = new tweetModel({
    userId: req.user.id,
    text,
  });

  await tweet.save();

  res.status(201).json(tweet);
});

router.put("/:id", async (req, res) => {
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
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const tweet = await tweetModel.findById(id);

  if (!tweet) {
    res.status(404).json({ error: "Tweet not found" });
    return;
  }

  await tweet.remove();

  res.status(200).json({});
});


router.post("/like/:id", async (req, res) => {
    const { id } = req.params;
  
    const tweet = await tweetModel.findById(id);
  
    if (!tweet) {
      res.status(404).json({ error: "Tweet not found" });
      return;
    }
  
    const user = req.user;
  
    // Check if the user has already liked the tweet
    const isLiked = tweet.likes.find((like) => like.userId === user.id);
  
    if (isLiked) {
      // If the user has already liked the tweet, remove the like
      tweet.likes.splice(tweet.likes.indexOf(isLiked), 1);
    } else {
      // If the user has not liked the tweet, add a like
      tweet.likes.push({ userId: user.id });
    }
  
    await tweet.save();
  
    res.status(200).json({ liked: !isLiked });
  });

module.exports = router;
