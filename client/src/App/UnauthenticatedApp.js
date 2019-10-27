import React from "react";
import { createBrowserHistory } from "history";
import { Switch, Route, Router } from "react-router-dom";

import AllPostsPage from "../components/AllPostsPage";
import Login from "../components/Login";
import Header from "../components/Header";
import Signup from "../components/Signup";
function UnauthenticatedApp() {
  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <>
        <Header />
        <Switch>
          <Route exact path="/" component={AllPostsPage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </>
    </Router>
  );
}

export default UnauthenticatedApp;
