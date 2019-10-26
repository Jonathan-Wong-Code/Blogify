import React from "react";
import { useAuthState } from "./context/auth";
import AuthenticatedApp from "./App/AuthenticatedApp";
import UnauthenticatedApp from "./App/UnauthenticatedApp";

function App() {
  const { user } = useAuthState();

  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;
