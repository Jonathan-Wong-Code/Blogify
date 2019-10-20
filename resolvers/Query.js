const User = require("../models/users");
const Post = require("../models/posts");
const APIFeatures = require("../utils/apiFeatures");

const Query = {
  users: async () => {
    const users = await User.find().populate("posts");
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
    console.log(queryParams);
    const features = new APIFeatures(
      Post.find({ author: req.user._id }),
      queryParams
    )
      .filter()
      .sort()
      .paginate();
    const myPosts = await features.queryObject;

    return myPosts;
  }
};

module.exports = Query;
