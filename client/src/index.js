import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "@apollo/react-hooks";
import { HttpLink } from "apollo-link-http";

import App from "./App";
import { AuthProvider } from "./context/auth";

const cache = new InMemoryCache();
const link = new HttpLink({
  credentials: "include",
  uri: "http://localhost:4000/graphql"
});

const client = new ApolloClient({
  cache,
  link
});

cache.writeData({
  data: {
    users: [],
    posts: [],
    comments: []
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
