import React, { useEffect } from "react";
import { useAuthState } from "./context/auth";
import AuthenticatedApp from "./App/AuthenticatedApp";
import UnauthenticatedApp from "./App/UnauthenticatedApp";
import useCheckAuth from "./hooks/useCheckAuth";
function App() {
  const { loading, checkLoggedIn } = useCheckAuth();
  const { user } = useAuthState();

  useEffect(() => {
    checkLoggedIn();
  }, []);
  if (loading) return <p>Loading...</p>;
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;
