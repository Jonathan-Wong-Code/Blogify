import React, { useReducer } from "react";
import { withRouter } from "react-router-dom";
import reducer from "./../../reducers/stateReducer";
import { useMutation } from "@apollo/react-hooks";
import { RESET_PASSWORD } from "../../mutations/auth";
import { useAuthDispatch } from "../../context/auth";
function ResetPassword({ match }) {
  const [{ password, confirmPassword }, setState] = useReducer(reducer, {
    password: "",
    confirmPassword: ""
  });

  const dispatch = useAuthDispatch();

  const [resetPassword, { data, error, loading }] = useMutation(
    RESET_PASSWORD,
    {
      onCompleted: data =>
        dispatch({ type: "LOGIN", user: data.resetPassword.user })
    }
  );

  const onSubmit = e => {
    e.preventDefault();
    resetPassword({
      variables: {
        token: match.params.token,
        password,
        confirmPassword
      }
    });
  };
  return (
    <section>
      <h2>Reset Password</h2>
      <form action="" onSubmit={onSubmit}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="text"
          id="new-password"
          value={password}
          onChange={e => setState({ password: e.target.value })}
        />
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="text"
          id="confirm-password"
          value={confirmPassword}
          onChange={e => setState({ confirmPassword: e.target.value })}
        />
        <button>Reset</button>
      </form>
      {loading && <p> Resetting password...</p>}
      {error && <p>{error.message}</p>}
      {!loading && data && <p>Password reset</p>}
    </section>
  );
}

export default withRouter(ResetPassword);
