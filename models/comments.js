const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Please enter the text"],
    trim: true
  },

  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },

  post: {
    type: mongoose.Schema.ObjectId,
    ref: "Post",
    required: true
  },

  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    }
  ]
});

commentSchema.pre(/^find/, function(next) {
  this.populate("author").populate("post");
  next();
});

module.exports = mongoose.model("Comment", commentSchema);
