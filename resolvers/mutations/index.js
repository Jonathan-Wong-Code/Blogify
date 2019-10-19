const Auth = require("./auth");
const Users = require("./users");
const Posts = require("./posts");

const Mutation = {
  ...Auth,
  ...Users,
  ...Posts
};

module.exports = Mutation;
