const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date
  type Query {
    users: [User!]!
    user(id: ID!): User!
    myPosts(queryParams: PostQueryParams): [Post!]!
    post: Post!
  }

  type Mutation {
    signup(data: SignupUserInput!): AuthPayload!
    login(data: LoginUserInput!): AuthPayload!
    logout: Message!

    resetPassword(data: ResetPasswordInput!): AuthPayload!
    forgotPassword(email: String): Message!
    updatePassword(data: UpdatePasswordInput!): Message!

    updateMe(data: UpdateUserInput): User!
    deleteMe: User!

    createPost(data: CreatePostInput!): Post!
    updatePost(id: ID!, data: UpdatePostInput!): Post!
    deletePost(id: ID!): Post!
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
    posts: [Post!]!
  }

  type Post {
    _id: ID!
    title: String!
    body: String!
    published: Boolean!
    createdAt: Date!
    updatedAt: Date
    author: User!
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

  input ResetPasswordInput {
    resetToken: String!
    password: String!
    confirmPassword: String!
  }

  input UpdatePasswordInput {
    currentPassword: String!
    updatedPassword: String!
    confirmUpdatedPassword: String!
  }

  input CreatePostInput {
    title: String!
    body: String!
  }

  input UpdatePostInput {
    title: String
    body: String
    published: Boolean
  }

  input PostQueryParams {
    title: String
    body: String
    published: Boolean
    sort: String
    limit: Float
    page: Float
  }

  input DeletePostInput {
    id: ID!
  }
`;

module.exports = typeDefs;
