const User = require("../models/users");
const Post = require("../models/posts");
const Comment = require("../models/comments");
const { checkAuth } = require("../utils/utils");
const APIFeatures = require("../utils/apiFeatures");

const Query = {
  users: async () => {
    const users = await User.find()
      .populate("posts")
      .populate("comments");
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
    { queryParams = {} },
    {
      request: { req }
    },
    info
  ) {
    if (!req.isAuth) {
      throw new Error("Must be authenticated to see your posts");
    }
    const features = new APIFeatures(
      Post.find({ author: req.user._id }).populate("comments"),
      queryParams
    )
      .filter()
      .sort()
      .paginate();
    const myPosts = await features.queryObject;
    return myPosts;
  },

  async comments(
    parents,
    { postId, queryParams = {} },
    {
      request: { req }
    },
    info
  ) {
    checkAuth(req);
    const features = new APIFeatures(Comment.find(), queryParams)
      .filter()
      .sort()
      .paginate();
    const comments = await features.queryObject;

    console.log(comments);

    return comments;
  }
};

module.exports = Query;
