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
        _id
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

export const FORGOT_PASSWORD = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email) {
      message
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword(
    $token: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      data: {
        resetToken: $token
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      token
      user {
        name
        _id
      }
    }
  }
`;
