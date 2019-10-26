import React from "react";
import { createBrowserHistory } from "history";
import { Switch, Route, Router } from "react-router-dom";

import AllPostsPage from "../components/AllPostsPage";
import LoggedIn from "../components/LoggedIn";
function AuthenticatedApp() {
  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <>
        <Switch>
          <Route path="/" component={LoggedIn} />
        </Switch>
      </>
    </Router>
  );
}

export default AuthenticatedApp;
