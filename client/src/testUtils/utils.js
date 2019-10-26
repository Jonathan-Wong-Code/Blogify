import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../context/auth";

export const renderContextRouter = ui => {
  return {
    ...render(
      <MemoryRouter>
        <AuthProvider>{ui}</AuthProvider>
      </MemoryRouter>
    )
  };
};

export const renderRouter = ui => {
  return {
    ...render(<MemoryRouter>{ui}</MemoryRouter>)
  };
};
