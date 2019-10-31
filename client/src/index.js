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
  uri: "http://localhost:4000/graphql",
  onError: ({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }
});

const client = new ApolloClient({
  cache,
  link
});

cache.writeData({
  data: {
    users: [],
    posts: []
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
