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
