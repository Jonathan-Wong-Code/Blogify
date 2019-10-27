import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthState } from "../context/auth";

export default function PublicRoute({ component: Component, ...rest }) {
  const { user } = useAuthState();
  return (
    <Route
      {...rest}
      component={props =>
        user ? <Redirect to="/allUsers" /> : <Component {...props} />
      }
    />
  );
}
