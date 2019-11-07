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
