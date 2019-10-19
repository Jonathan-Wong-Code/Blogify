const User = require("../../models/users");
const Post = require("../../models/posts");
const { checkAuth } = require("../../utils/utils");

const Posts = {
  async createPost(
    parent,
    { data },
    {
      request: { req }
    },
    info
  ) {
    checkAuth(req);
    const post = await Post.create({ ...data, author: req.user._id });
    return post;
  },

  async updatePost(
    parent,
    { id, data },
    {
      request: { req }
    },
    info
  ) {
    checkAuth(req);

    const post = await Post.findOneAndUpdate(
      { _id: id, author: req.user._id },
      data,
      {
        runValidators: true,
        new: true
      }
    );

    if (!post) {
      throw new Error("404 Post not found");
    }

    return post;
  },

  async deletePost(
    parent,
    { id },
    {
      request: { req }
    },
    info
  ) {
    checkAuth(req);

    const post = await Post.findOneAndDelete({ _id: id, author: req.user._id });

    if (!post) {
      throw new Error("404 Post not found");
    }

    return post;
  }
};

module.exports = Posts;
