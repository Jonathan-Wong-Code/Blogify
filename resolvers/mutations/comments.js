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

      const populatedComment = await Comment.findById(comment._id);

      return populatedComment;
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

  addCommentLike: catchAsync(
    async (parent, { commentId }, { request: { req } }, info) => {
      checkAuth(req);
      let comment = await Comment.findById(commentId);
      if (!comment) {
        throw new Error("Comment not found");
      }
      if (
        comment.likes.some(
          like => like._id.toString() === req.user._id.toString()
        )
      ) {
        const filteredLikes = comment.likes.filter(
          like => like._id.toString() !== req.user._id.toString()
        );

        const newComment = await Comment.findByIdAndUpdate(
          comment._id,
          { likes: filteredLikes },
          { runValidators: true, new: true }
        );

        return newComment;
      }

      comment.likes.push(req.user._id);
      await comment.save();
      const updatedComment = await Comment.findById(commentId);

      return updatedComment;
    }
  )
};

module.exports = Comments;
