import React, { useReducer } from "react";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { useHistory } from "react-router-dom";

import reducer from "../../reducers/stateReducer";
import { useAuthDispatch } from "../../context/auth";
import { LOGIN } from "../../constants";

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      token
      user {
        name
        email
      }
    }
  }
`;

export default function Login() {
  const [{ email, password }, setState] = useReducer(reducer, {
    email: "",
    password: ""
  });

  const dispatch = useAuthDispatch();
  const history = useHistory();

  const [login, { error, loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: ({ login: { user } }) => {
      dispatch({ type: LOGIN, user });
      history.push("/");
    }
  });

  const onSubmit = e => {
    e.preventDefault();
    login({
      variables: {
        email,
        password
      }
    });
  };

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      LoginPage
      <form action="" onSubmit={onSubmit}>
        <label htmlFor="login-email">Email: </label>
        <input
          type="text"
          name="email"
          id="login-email"
          value={email}
          onChange={e => setState({ email: e.target.value })}
        />
        <label htmlFor="password">Password: </label>
        <input
          type="text"
          name="password"
          id="login-password"
          value={password}
          onChange={e => setState({ password: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error.message}</p>}
    </div>
  );
}
