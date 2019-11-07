import gql from "graphql-tag";

export const COMMENTS_BY_POST = gql`
  mutation commentsByPost($postId: ID!) {
    commentsByPost(postId: $postId) {
      text
      _id
      author {
        name
        _id
      }
    }
  }
`;
