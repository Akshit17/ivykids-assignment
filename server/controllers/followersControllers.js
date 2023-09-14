const express = require("express");
const router = express.Router();
const followersModel = require("../model/followersModel");

router.post("/follow/:userId", async (req, res) => {
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
});

router.delete("/unfollow/:userId", async (req, res) => {
  const { userId } = req.params;

  const user = req.user;

  const follower = await followersModel.findOne({
    followerUserId: user.id,
    followingUserId: userId,
  });

  if (!follower) {
    res.status(400).json({ error: "You are not following this user" });
    return;
  }

  await follower.remove();

  res.status(200).json({});
});

module.exports = router;