import React, { useReducer } from "react";
import reducer from "../../reducers/stateReducer";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_PASSWORD } from "../../mutations/auth";

export default function UpdatePassword() {
  const [
    { currentPassword, updatedPassword, confirmUpdatedPassword },
    setState
  ] = useReducer(reducer, {
    currentPassword: "",
    updatedPassword: "",
    confirmUpdatedPassword: ""
  });

  const [updatePassword, { error, loading, data }] = useMutation(
    UPDATE_PASSWORD
  );

  const onSubmit = e => {
    e.preventDefault();
    updatePassword({
      variables: {
        currentPassword,
        updatedPassword,
        confirmUpdatedPassword
      }
    });
  };
  return (
    <section>
      <h2>Update Password</h2>
      <form action="" onSubmit={onSubmit}>
        <label htmlFor="current-pass">Current Password</label>
        <input
          type="text"
          id="current-pass"
          value={currentPassword}
          onChange={e => setState({ currentPassword: e.target.value })}
        />
        <label htmlFor="updated-pass">Updated Password</label>
        <input
          type="text"
          id="updated-pass"
          value={updatedPassword}
          onChange={e => setState({ updatedPassword: e.target.value })}
        />
        <label htmlFor="confirm-updated-pass">Confirm Password</label>
        <input
          type="text"
          id="confirm-updated-pass"
          value={confirmUpdatedPassword}
          onChange={e => setState({ confirmUpdatedPassword: e.target.value })}
        />
        <button>Submit</button>
      </form>
      {error && <p>{error.message}</p>}
      {loading && <p>Updating password</p>}
      {!loading && data && <p>{data.updatePassword.message}</p>}
    </section>
  );
}
