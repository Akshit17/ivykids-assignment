const tweetSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User ID is Required"],
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Text is Required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    likes: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    }],
  });
  
  module.exports = mongoose.model("Tweets", tweetSchema);
  