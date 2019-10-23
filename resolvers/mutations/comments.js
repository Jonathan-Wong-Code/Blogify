const { checkAuth } = require("../../utils/utils.js");
const Post = require("../../models/posts");
const Comment = require("../../models/comments");
const catchAsync = require("../../utils/catchAsync");

const Comments = {
  createComment: catchAsync(
    async (parent, { postId, data }, { request: { req } }, info) => {
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
    }
  ),

  updateComment: catchAsync(
    async (parent, { commentId, postId, data }, { request: { req } }, info) => {
      checkAuth(req);

      const comment = await Comment.findOneAndUpdate(
        {
          _id: commentId,
          author: req.user._id
        },
        data,
        { runValidators: true, new: true }
      );

      if (!comment) {
        throw new Error("No comment found with that ID");
      }

      return comment;
    }
  ),

  deleteComment: catchAsync(
    async (parent, { commentId }, { request: { req } }, info) => {
      checkAuth(req);
      const comment = await Comment.findOneAndDelete({
        _id: commentId,
        author: req.user._id
      });
      if (!comment) {
        throw new Error("404 Comment not found");
      }

      return comment;
    }
  ),

  addLike: catchAsync(
    async (parent, { commentId }, { request: { req } }, info) => {
      checkAuth(req);
      const comment = await Comment.findById(commentId);
      if (!comment) {
        throw new Error("Comment not found");
      }

      if (
        comment.likes.some(like => like.toString() === req.user._id.toString())
      ) {
        const updatedComment = await Comment.findByIdAndUpdate(commentId, {
          likes: comment.likes.filter(
            like => like.toString() !== req.user._id.toString()
          )
        });

        return updatedComment;
      }

      const updatedComment = await Comment.findByIdAndUpdate(commentId, {
        likes: [...comment.likes, req.user._id]
      });

      return updatedComment;
    }
  )
};

module.exports = Comments;
