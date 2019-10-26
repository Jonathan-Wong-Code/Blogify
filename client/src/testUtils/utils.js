import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../context/auth";
import { ApolloProvider } from "@apollo/react-hooks";

export const renderContextRouterApollo = ui => {
  return {
    ...render(
      <ApolloProvider client={{}}>
        <MemoryRouter>
          <AuthProvider>{ui}</AuthProvider>
        </MemoryRouter>
      </ApolloProvider>
    )
  };
};
