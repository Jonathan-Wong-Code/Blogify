import gql from "graphql-tag";

export const CREATE_COMMENT = gql`
  mutation createComment($text: String!, $postId: ID!) {
    createComment(data: { text: $text }, postId: $postId) {
      text
      _id
      author {
        name
        _id
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($commentId: ID!) {
    deleteComment(commentId: $commentId) {
      _id
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation updateComment($commentId: ID!, $text: String!) {
    updateComment(commentId: $commentId, data: { text: $text }) {
      text
      _id
      author {
        name
        _id
      }
    }
  }
`;
