const User = require("../models/users");
const Post = require("../models/posts");
const Comment = require("../models/comments");
const { checkAuth, checkAdmin } = require("../utils/utils");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils//catchAsync");

const Query = {
  users: catchAsync(async (parent, args, { request: { req } }, info) => {
    checkAuth(req);
    // checkAdmin(req);
    const users = await User.find()
      .populate({ path: "posts", populate: { path: "comments" } })
      .populate("comments");

    return users;
  }),

  user: catchAsync(async (parent, { id }, { request: { req } }, info) => {
    checkAuth(req);
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
    async (parent, { queryParams }, { request: { req } }, info) => {
      checkAuth(req);

      const features = new APIFeatures(
        Post.find({ author: req.user._id }).populate({
          path: "comments",
          populate: "author"
        }),
        queryParams,
        "posts"
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
      console.log(queryParams);
      const features = new APIFeatures(
        Post.find({ published: true }).populate({
          path: "comments",
          populate: "author"
        }),
        queryParams,
        "posts"
      )
        .filter()
        .sort()
        .paginate();
      const posts = await features.queryObject;

      return posts;
    }
  ),
  // Fetch a public post
  publicPost: catchAsync((parent, { id }, ctx, info) => {
    const post = Post.findOne({ published: true, _id: id });
    if (!post) {
      throw new Error("404 Post not found");
    }

    return post;
  }),

  privatePost: catchAsync((parent, { id }, { request: { req } }, info) => {
    checkAuth(req);
    const post = Post.findOne({ _id: id, author: req.user._id });
    if (!post) {
      throw new Error("404 Post not found");
    }

    return post;
  }),

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
  ),

  getNumPublicPosts: catchAsync(
    async (parent, { data = {} }, { request: { req } }, info) => {
      const { title, body } = data;
      const titleRegExp = new RegExp(title, "gi");
      const bodyRegExp = new RegExp(body, "gi");
      const stats = await Post.aggregate([
        {
          $match: {
            title: titleRegExp ? titleRegExp : "",
            body: bodyRegExp ? bodyRegExp : "",
            published: true
          }
        },
        {
          $group: {
            _id: "$published",
            nTasks: { $sum: 1 }
          }
        }
      ]);

      return { numPosts: stats[0].nTasks };
    }
  )
};

module.exports = Query;
