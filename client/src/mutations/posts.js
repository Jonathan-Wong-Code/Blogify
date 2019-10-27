import gql from "graphql-tag";

export const CREATE_POST = gql`
  mutation createPost($title: String!, $body: String!) {
    createPost(data: { title: $title, body: $body }) {
      _id
      title
      body
      author {
        name
      }
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost($title: String!, $body: String!) {
    updatePost(data: { title: $title, body: $body }) {
      _id
      title
      body
      author {
        name
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation deleteAnyPost($id: ID!) {
    deleteAnyPost(id: $id) {
      _id
    }
  }
`;
