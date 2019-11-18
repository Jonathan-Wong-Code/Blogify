import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { FORGOT_PASSWORD } from "./../../mutations/auth";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [sendEmail, { data, loading, error }] = useMutation(FORGOT_PASSWORD);

  const onSubmit = e => {
    e.preventDefault();
    sendEmail({
      variables: {
        email
      }
    });

    setEmail("");
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <section>
      <form action="" onSubmit={onSubmit}>
        <label htmlFor="forgot-pass-email">Enter email:</label>
        <input
          type="text"
          id="forgot-pass-email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button>Reset password</button>
      </form>
      {error && <p>{error.message}</p>}
      {loading && <p>Sending reset email...</p>}
      {!loading && data && <p>{data.forgotPassword.message}</p>}
    </section>
  );
}

export default ForgotPassword;
