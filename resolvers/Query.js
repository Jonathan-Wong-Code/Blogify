const User = require("../models/users");
const Post = require("../models/posts");
const Comment = require("../models/comments");
const { checkAuth } = require("../utils/utils");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils//catchAsync");

const Query = {
  users: catchAsync(async () => {
    const users = await User.find()
      .populate({ path: "posts", populate: { path: "comments" } })
      .populate("comments");
    return users;
  }),

  user: catchAsync(async (parent, { id }, { request: { req } }, info) => {
    if (!req.isAuth) {
      throw new Error("Must be authenticated!");
    }
    const user = await User.findById({ _id: id }).populate({
      path: "posts",
      populate: "comments"
    });

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }),

  myPosts: catchAsync(
    async (parent, { queryParams = {} }, { request: { req } }, info) => {
      if (!req.isAuth) {
        throw new Error("Must be authenticated to see your posts");
      }
      const features = new APIFeatures(
        Post.find({ author: req.user._id }).populate({
          path: "comments",
          populate: "author"
        }),
        queryParams
      )
        .filter()
        .sort()
        .paginate();
      const myPosts = await features.queryObject;
      return myPosts;
    }
  ),

  allPosts: catchAsync(
    async (parent, { queryParams = {} }, { request: { req } }, info) => {
      const features = new APIFeatures(
        Post.find({ published: true }).populate({
          path: "comments",
          populate: "author"
        }),
        queryParams
      )
        .filter()
        .sort()
        .paginate();
      const posts = await features.queryObject;

      return posts;
    }
  ),

  comments: catchAsync(
    async (
      parents,
      { postId, queryParams = {} },
      { request: { req } },
      info
    ) => {
      checkAuth(req);
      const features = new APIFeatures(Comment.find(), queryParams)
        .filter()
        .sort()
        .paginate();
      const comments = await features.queryObject;

      return comments;
    }
  )
};

module.exports = Query;
