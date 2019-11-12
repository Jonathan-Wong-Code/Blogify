import gql from "graphql-tag";
import { POST_W_AUTHOR } from "../fragments";
export const CREATE_POST = gql`
  mutation createPost($title: String!, $body: String!) {
    createPost(data: { title: $title, body: $body }) {
      ...PostWithAuthor
    }
  }
  ${POST_W_AUTHOR}
`;

export const UPDATE_POST = gql`
  mutation updatePost(
    $title: String
    $body: String
    $published: Boolean
    $id: ID!
  ) {
    updatePost(
      id: $id
      data: { title: $title, body: $body, published: $published }
    ) {
      ...PostWithAuthor
      published
    }
  }
  ${POST_W_AUTHOR}
`;

export const DELETE_ANY_POST = gql`
  mutation deleteAnyPost($id: ID!) {
    deleteAnyPost(id: $id) {
      _id
    }
  }
`;

export const DELETE_MY_POST = gql`
  mutation deleteMyPost($id: ID!) {
    deleteMyPost(id: $id) {
      _id
    }
  }
`;

export const ADD_POST_LIKE = gql`
  mutation addPostLike($postId: ID!) {
    addPostLike(postId: $postId) {
      _id
      __typename
      author {
        __typename
        name
      }
    }
  }
`;
