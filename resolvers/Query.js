const User = require("../models/users");

const Query = {
  users: async () => {
    const users = await User.find();
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
    const user = await User.findById({ _id: id });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
};

module.exports = Query;
