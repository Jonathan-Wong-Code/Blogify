import React, { useEffect } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { useAuthState } from "./context/auth";
import useCheckAuth from "./hooks/useCheckAuth";
import AllPostsPage from "./components/AllPostsPage";
import AllUsersPage from "./components/AllUsersPage";
import Login from "./components/Login";
import MyProfile from "./components/MyProfile";
import Signup from "./components/Signup";
import Header from "./components/Header";

import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
function App() {
  const { loading, checkLoggedIn } = useCheckAuth();

  const history = createBrowserHistory();

  useEffect(() => {
    checkLoggedIn();
  }, [checkLoggedIn]);

  if (loading) return <p>Loading...App</p>;
  return (
    <Router history={history}>
      <>
        <Header />
        <Switch>
          <Route exact path="/" component={AllPostsPage} />
          <PrivateRoute exact path="/allUsers" component={AllUsersPage} />
          <PublicRoute path="/login" component={Login} />
          <PrivateRoute path="/my-profile" component={MyProfile} />
          <PublicRoute path="/signup" component={Signup} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
