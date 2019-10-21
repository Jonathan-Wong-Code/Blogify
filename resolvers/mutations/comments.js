const { checkAuth } = require("../../utils/utils.js");
const Post = require("../../models/posts");
const Comment = require("../../models/comments");

const Comments = {
  async createComment(
    parent,
    { postId, data },
    {
      request: { req }
    },
    info
  ) {
    checkAuth(req);
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("404 Post not found");
    }
    const comment = await Comment.create({
      ...data,
      author: req.user._id,
      post: postId
    });

    return comment;
  },

  async updateComment(
    parent,
    { commentId, postId, data },
    {
      request: { req }
    },
    info
  ) {
    checkAuth(req);
    try {
      const postExists = await Post.findById(postId);
      if (!postExists) {
        throw new Error("404 Post does not exist");
      }
      const comment = await Comment.findOneAndUpdate({
        _id: commentId,
        post: postId,
        author: req.user._id
      });

      if (!comment) {
        throw new Error("No comment found with that ID");
      }

      return comment;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

module.exports = Comments;
