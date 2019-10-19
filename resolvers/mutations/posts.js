const User = require("../../models/users");
const Post = require("../../models/posts");

const Posts = {
  async createPost(
    parent,
    { data },
    {
      request: { req }
    },
    info
  ) {
    if (!req.isAuth) {
      throw new Error("Must be authenticated");
    }

    const post = await Post.create({ ...data, author: req.user._id });
    console.log(post);
    return post;
  }
};

module.exports = Posts;
