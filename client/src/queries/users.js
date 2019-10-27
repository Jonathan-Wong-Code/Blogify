import gql from "graphql-tag";

export const GET_ALL_USERS = gql`
  query users {
    users {
      name
      email
      _id
      posts {
        title
      }
    }
  }
`;
