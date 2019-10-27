import React from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/react-hooks";
import { useAuthState, useAuthDispatch } from "../../context/auth";
import { LOGOUT } from "../../constants";
import { LOGOUT_MUTATION } from "../../mutations/auth";

function Header() {
  const { user } = useAuthState();
  const dispatch = useAuthDispatch();

  const [logout, { loading }] = useMutation(LOGOUT_MUTATION, {
    onCompleted: data => dispatch({ type: LOGOUT })
  });
  return (
    <header>
      <h1>Blogify</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">All Posts</Link>
          </li>
          <li>
            <Link to="/allUsers">All Users</Link>
          </li>
          {user && (
            <>
              <li>
                <Link to="create-post">Create Post</Link>
              </li>
              <li>
                <button onClick={logout} aria-busy={loading}>
                  Log{loading ? "ging out..." : "out"}
                </button>
              </li>
            </>
          )}
          {!user && (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
