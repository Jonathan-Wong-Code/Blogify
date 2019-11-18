import React, { useEffect } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import "./App.css";

import useCheckAuth from "./hooks/useCheckAuth";
import AllPostsPage from "./components/AllPostsPage";
import AllUsersPage from "./components/AllUsersPage";
import CreatePost from "./components/CreatePost";
import ForgotPassword from "./components/ForgotPassword";
import Login from "./components/Login";
import MyPostsPage from "./components/MyPostsPage";
import MyProfile from "./components/MyProfile";
import PublicPost from "./components/PublicPost";
import PrivatePost from "./components/PrivatePost";

import Signup from "./components/Signup";
import Header from "./components/Header";
import UpdatePost from "./components/UpdatePost";

import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import ResetPassword from "./components/ResetPassword";

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
          <PrivateRoute exact path="/my-posts" component={MyPostsPage} />
          <PrivateRoute exact path="/allUsers" component={AllUsersPage} />
          <PrivateRoute path="/create-post" component={CreatePost} />
          <PrivateRoute path="/update-post/:id" component={UpdatePost} />
          <PrivateRoute path="/my-profile" component={MyProfile} />
          <Route path="/public-post/:id" component={PublicPost} />
          <PrivateRoute path="/my-posts/:id" component={PrivatePost} />
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/signup" component={Signup} />
          <PublicRoute path="/forgot-password" component={ForgotPassword} />
          <PublicRoute
            path="/reset-password/:token"
            component={ResetPassword}
          />
        </Switch>
      </>
    </Router>
  );
}

export default App;
