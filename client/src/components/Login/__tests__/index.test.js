import React from "react";
import { render, cleanup, fireEvent, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Login from "..";
import { renderContextRouterApollo } from "../../../testUtils/utils";

describe("<Login>", () => {
  it("renders", () => {
    renderContextRouterApollo(<Login />);
  });
});
