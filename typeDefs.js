const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    users: [User!]!
    user(id: ID!): User!
  }

  type Mutation {
    signup(data: SignupUserInput!): AuthPayload!
    login(data: LoginUserInput!): AuthPayload!
    logout: Message!

    forgotPassword(email: String): Message!

    updateMe(data: UpdateUserInput): User!
    deleteMe: User!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Message {
    message: String!
  }

  type User {
    _id: ID!
    createdAt: String!
    name: String!
    email: String!
    password: String
    confirmPassword: String
    passwordResetExpiry: String
    passwordResetToken: String
    passwordChangedAt: String
    isActive: Boolean!
  }

  input SignupUserInput {
    name: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  input UpdateUserInput {
    email: String
    name: String
  }
`;

module.exports = typeDefs;
