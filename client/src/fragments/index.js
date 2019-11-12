import gql from "graphql-tag";

export const POST_W_AUTHOR = gql`
  fragment PostWithAuthor on Post {
    title
    body
    likes {
      __typename
      name
      _id
    }
    _id
    __typename
    author {
      name
      __typename
    }
  }
`;
