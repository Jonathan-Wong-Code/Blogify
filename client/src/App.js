import React, { useEffect } from "react";
import { useAuthState } from "./context/auth";
import AuthenticatedApp from "./app/AuthenticatedApp";
import UnauthenticatedApp from "./app/UnauthenticatedApp";
import useCheckAuth from "./hooks/useCheckAuth";

function App() {
  const { loading, checkLoggedIn } = useCheckAuth();
  const { user } = useAuthState();

  useEffect(() => {
    checkLoggedIn();
    console.log("checking");
  }, [checkLoggedIn]);

  if (loading) return <p>Loading...App</p>;
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;
