import gql from "graphql-tag";

export const LOGOUT_MUTATION = gql`
  mutation logout {
    logout {
      message
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      token
      user {
        name
        email
        role
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation signup(
    $name: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    signup(
      data: {
        name: $name
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      token
      user {
        name
        email
        _id
        role
      }
    }
  }
`;
