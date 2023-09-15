const { createTweet, updateTweet, deleteTweet, likeTweet, getTweets } = require("../controllers/tweetController");
const {checkUser} = require("../middlewares/authMiddleware")
const express = require("express");
const router = express.Router();

router.get("/", checkUser, getTweets)
router.post("/", checkUser, createTweet);
router.put("/:id", checkUser, updateTweet);
router.delete("/:id", checkUser, deleteTweet);
router.post("/like/:id", checkUser, likeTweet);
// router.get("/like/:id", checkUser, isLiked);

module.exports = router;
