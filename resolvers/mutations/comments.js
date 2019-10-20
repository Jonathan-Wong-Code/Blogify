const { checkAuth } = require("../../utils/utils.js");
const Post = require("../../models/posts");

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

    const comment = await comment.Create({
      ...data,
      author: req.user._id,
      post: postId
    });

    return comment;
  }
};

module.exports = Comments;
