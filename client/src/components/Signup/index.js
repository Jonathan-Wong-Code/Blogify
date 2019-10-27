import React, { useReducer } from "react";
import { useMutation } from "@apollo/react-hooks";

import { SIGNUP_MUTATION } from "../../mutations/auth";
import { GET_ALL_USERS } from "../../queries/users";
import reducer from "../../reducers/stateReducer";
import { useAuthDispatch } from "../../context/auth";
import { LOGIN } from "../../constants";
export default function Signup() {
  const [{ name, email, password, confirmPassword }, setState] = useReducer(
    reducer,
    {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      userLoggedIn: false
    }
  );

  const dispatch = useAuthDispatch();

  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION, {
    update: (
      cache,
      {
        data: {
          signup: { user }
        }
      }
    ) => {
      const { users } = cache.readQuery({ query: GET_ALL_USERS });
      cache.writeQuery({
        query: GET_ALL_USERS,
        data: { users: [...users, user] }
      });
    },

    onCompleted: ({ signup: { user } }) => {
      dispatch({ type: LOGIN, user });
    }
  });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await signup({
        variables: {
          name,
          email,
          password,
          confirmPassword
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) return <p>Loading...</p>;
  return (
    <section>
      <h2>Signup!</h2>
      <form action="" onSubmit={onSubmit}>
        <label htmlFor="signup-name">Name:</label>
        <input
          type="text"
          id="signup-name"
          value={name}
          onChange={e => setState({ name: e.target.value })}
        />
        <label htmlFor="signup-email">Email:</label>
        <input
          type="text"
          id="signup-email"
          value={email}
          onChange={e => setState({ email: e.target.value })}
        />
        <label htmlFor="signup-password">Password:</label>
        <input
          type="text"
          id="signup-password"
          value={password}
          onChange={e => setState({ password: e.target.value })}
        />
        <label htmlFor="signup-confirm-password">Confirm Password:</label>
        <input
          type="text"
          id="signup-confirm-passwrd"
          value={confirmPassword}
          onChange={e => setState({ confirmPassword: e.target.value })}
        />
        <button>Submit</button>
      </form>
      {error && <p>{error.message}</p>}
    </section>
  );
}
