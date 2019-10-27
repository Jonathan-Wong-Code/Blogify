import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthState } from "../context/auth";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useAuthState();
  return (
    <Route
      {...rest}
      component={props =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
