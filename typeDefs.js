const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date
  type Query {
    users: [User!]!
    user(id: ID!): User!
    myPosts(queryParams: PostQueryParams): [Post!]!
    allPosts(queryParams: PostQueryParams): [Post!]!
    comments(queryParams: CommentQueryParams): [Comment!]!
    commentsByPost(postId: ID!): [Comment!]!
    publicPost(id: ID!): Post!
    privatePost(id: ID!): Post!

    getNumPublicPosts(data: GetNumPostsInput): NumPosts!

    me: User!
  }

  type Mutation {
    signup(data: SignupUserInput!): AuthPayload!
    login(data: LoginUserInput!): AuthPayload!
    logout: Message!
    checkLoggedIn: AuthPayload!

    resetPassword(data: ResetPasswordInput!): AuthPayload!
    forgotPassword(email: String): Message!
    updatePassword(data: UpdatePasswordInput!): Message!

    updateMe(data: UpdateMeInput): User!
    deleteMe: User!

    updateUser(userId: ID!, data: UpdateUserInput): User!
    deactivateUser(id: ID!): User!

    createPost(data: CreatePostInput!): Post!
    updatePost(id: ID!, data: UpdatePostInput!): Post!
    deleteMyPost(id: ID!): Post!

    deleteAnyPost(id: ID!): Post!

    createComment(postId: ID!, data: CreateCommentInput): Comment!
    updateComment(commentId: ID!, data: UpdateCommentInput!): Comment!
    deleteComment(commentId: ID!): Comment!
    addLike(commentId: ID): Comment!
    addPostLike(postId: ID!): Post!
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
    role: String
    posts: [Post!]!
    comments: [Comment!]!
  }

  input UpdateUserInput {
    name: String
    email: String
    password: String
    confirmPassword: String
    isActive: Boolean
    role: String
  }

  type Post {
    _id: ID!
    title: String!
    body: String!
    published: Boolean!
    createdAt: Date!
    updatedAt: Date
    author: User!
    likes: [User!]!
    comments: [Comment!]!
  }

  type Comment {
    _id: ID!
    text: String!
    author: User!
    post: Post!
    likes: [ID!]!
  }

  type NumPosts {
    numPosts: Int!
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

  input UpdateMeInput {
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

  input CommentQueryParams {
    text: String
    sort: String
    limit: Float
    page: Float
  }

  input CreateCommentInput {
    text: String!
  }

  input UpdateCommentInput {
    text: String!
  }

  input GetNumPostsInput {
    title: String
    body: String
  }
`;

module.exports = typeDefs;
