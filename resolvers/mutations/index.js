const Auth = require("./auth");
const Users = require("./users");
const Mutation = {
  ...Auth,
  ...Users
};

module.exports = Mutation;
