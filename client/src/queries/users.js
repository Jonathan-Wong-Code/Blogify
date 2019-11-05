import gql from "graphql-tag";

export const GET_ALL_USERS = gql`
  query users {
    users {
      name
      email
      _id
    }
  }
`;

export const GET_MY_PROFILE = gql`
  query me {
    me {
      name
      email
      _id
    }
  }
`;
