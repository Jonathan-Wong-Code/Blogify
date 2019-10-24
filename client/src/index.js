import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "@apollo/react-hooks";
import { HttpLink } from "apollo-link-http";
import App from "./App";

const cache = new InMemoryCache();
const link = new HttpLink({
  credentials: "include",
  uri: "http://localhost:4000/graphql"
  // fetchOptions: {
  //   mode: "no-cors"
  // }
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
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
