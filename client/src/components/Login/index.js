import React, { useReducer } from "react";

import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

import reducer from "../../reducers/stateReducer";
import { useAuthDispatch } from "../../context/auth";
import { LOGIN } from "../../constants";
import { LOGIN_MUTATION } from "../../mutations/auth";

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
      history.push("/allUsers");
    },
    //Hacky fix fo Error tests but still an open issue in Apollo
    onError: () => {}
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

  if (loading) return <p data-testid="login-loading">Loading...</p>;
  return (
    <section data-testid="login-page">
      LoginPage
      <form action="" onSubmit={onSubmit} data-testid="login-form">
        <label htmlFor="login-email">Email:</label>
        <input
          type="text"
          name="email"
          id="login-email"
          value={email}
          onChange={e => setState({ email: e.target.value })}
        />
        <label htmlFor="login-password">Password:</label>
        <input
          type="text"
          name="password"
          id="login-password"
          value={password}
          onChange={e => setState({ password: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p data-testid="login-error">{error.message}</p>}
    </section>
  );
}
