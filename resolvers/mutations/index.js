const Auth = require("./auth");
const Users = require("./users");
const Posts = require("./posts");
const Comments = require("./comments");

const Mutation = {
  ...Auth,
  ...Users,
  ...Posts,
  ...Comments
};

module.exports = Mutation;
