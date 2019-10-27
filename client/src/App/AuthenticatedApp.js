import React from "react";
import { createBrowserHistory } from "history";
import { Switch, Route, Router } from "react-router-dom";

import AllPostsPage from "../components/AllPostsPage";
import AllUsersPage from "../components/AllUsersPage";
import MyProfile from "../components/MyProfile";
import Header from "../components/Header";

function AuthenticatedApp() {
  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <>
        <Header />
        <Switch>
          <Route exact path="/" component={AllPostsPage} />
          <Route path="/allUsers" component={AllUsersPage} />
          <Route path="/my-profile" component={MyProfile} />
        </Switch>
      </>
    </Router>
  );
}

export default AuthenticatedApp;
