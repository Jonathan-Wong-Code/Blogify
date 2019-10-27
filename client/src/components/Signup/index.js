import React from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";

import { SIGNUP_MUTATION } from "../../mutations/auth";

export default function Signup() {
  const history = useHistory();
  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION, {
    update: (cache, { signup: { user } }) => {}
  });
  return (
    <section>
      <h2>Signup!</h2>
    </section>
  );
}
