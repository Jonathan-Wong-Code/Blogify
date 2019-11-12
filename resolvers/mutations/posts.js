const Post = require("../../models/posts");
const { checkAuth, checkAdmin } = require("../../utils/utils");
const catchAsync = require("../../utils/catchAsync");

const Posts = {
  async createPost(parent, { data }, { request: { req } }, info) {
    checkAuth(req);
    let post = await Post.create({ ...data, author: req.user._id });
    post = await post.populate("author").execPopulate();
    return post;
  },

  async updatePost(parent, { id, data }, { request: { req } }, info) {
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

  async deleteMyPost(parent, { id }, { request: { req } }, info) {
    checkAuth(req);

    const post = await Post.findOneAndDelete({ _id: id, author: req.user._id });

    if (!post) {
      throw new Error("404 Post not found");
    }

    return post;
  },

  deleteAnyPost: catchAsync(
    async (parent, { id }, { request: { req } }, info) => {
      checkAuth(req);
      checkAdmin(req);

      const post = await Post.findByIdAndDelete({ _id: id });
      if (!post) {
        throw new Error("No post found");
      }

      return post;
    }
  ),

  addPostLike: catchAsync(
    async (parent, { postId }, { request: { req } }, info) => {
      const post = await Post.findById(postId);
      if (!post) {
        throw new Error("404 post not found");
      }
      console.log(post);
      if (
        post.likes.some(like => like.toString() === req.user._id.toString())
      ) {
        throw new Error("Post already liked");
      }

      post.likes.push(req.user._id);
      await post.save();

      return post;
    }
  )
};

module.exports = Posts;
