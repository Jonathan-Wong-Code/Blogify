import React, { useReducer } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { useAuthDispatch } from "../context/auth";
import { LOGIN } from "../constants";

const CHECK_LOGGED_IN = gql`
  mutation checkLoggedIn {
    checkLoggedIn {
      token
      user {
        name
        email
      }
    }
  }
`;

function useCheckAuth() {
  const dispatch = useAuthDispatch();

  const [checkLoggedIn, { error, loading }] = useMutation(CHECK_LOGGED_IN, {
    onCompleted: ({ checkLoggedIn: { user } }) => {
      dispatch({ type: LOGIN, user });
    }
  });

  return { loading, checkLoggedIn, error };
}

export default useCheckAuth;
