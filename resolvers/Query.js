const User = require("../models/users");
const Post = require("../models/posts");
const Query = {
  users: async () => {
    const users = await User.find().populate("posts");
    return users;
  },

  async user(
    parent,
    { id },
    {
      request: { req }
    },
    info
  ) {
    if (!req.isAuth) {
      throw new Error("Must be authenticated!");
    }
    const user = await User.findById({ _id: id }).populate("posts");

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  },

  async myPosts(
    parent,
    args,
    {
      request: { req }
    },
    info
  ) {
    if (!req.isAuth) {
      throw new Error("Must be authenticated to see your posts");
    }

    const myPosts = await Post.find({ author: req.user._id });
    return myPosts;
  }
};

module.exports = Query;
