import React from "react";
import { cleanup, fireEvent, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MockedProvider } from "@apollo/react-testing";
import { GraphQLError } from "graphql";

import Login, { LOGIN_MUTATION } from "..";
import { renderRouter } from "../../../testUtils/utils";
import { useAuthDispatch } from "../../../context/auth";

jest.mock("../../../context/auth.js");

const dispatch = jest.fn();

useAuthDispatch.mockImplementation(() => {
  return dispatch;
});

const login = {
  token: "token",
  user: { name: "testName", email: "test@test.com" }
};

const successMock = [
  {
    request: {
      query: LOGIN_MUTATION,
      variables: { email: "test@test.com", password: "test1234" }
    },

    result: () => {
      loginMutationCalled = true;
      return { data: { login } };
    }
  }
];

const failureMock = [
  {
    request: {
      query: LOGIN_MUTATION,
      variables: { email: "test@test.com", password: "test1234" }
    },

    result: {
      errors: [new GraphQLError("new graphQL error")]
    }
  }
];

let loginMutationCalled;

beforeEach(() => {
  jest.clearAllMocks();
  loginMutationCalled = false;
});

afterEach(cleanup);

describe("<Login>", () => {
  it("renders", () => {
    renderRouter(
      <MockedProvider mocks={successMock} addTypename={false}>
        <Login />
      </MockedProvider>
    );
  });

  it("Should allow the user to enter an email and password to login", async () => {
    const { getByTestId, getByLabelText, container } = renderRouter(
      <MockedProvider mocks={successMock} addTypename={false}>
        <Login />
      </MockedProvider>
    );
    const email = getByLabelText("Email:");
    const password = getByLabelText("Password:");

    fireEvent.change(email, { target: { value: "test@test.com" } });
    fireEvent.change(password, { target: { value: "test1234" } });

    expect(email).toHaveValue("test@test.com");
    expect(password).toHaveValue("test1234");

    fireEvent.submit(getByTestId("login-form"));
    expect(getByTestId("login-loading")).toBeDefined();
    await wait(() => {
      expect(loginMutationCalled).toBe(true);
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });

  it("Should throw an error from a 400 response", async () => {
    const { getByTestId, getByLabelText } = renderRouter(
      <MockedProvider mocks={failureMock} addTypename={false}>
        <Login />
      </MockedProvider>
    );
    const email = getByLabelText("Email:");
    const password = getByLabelText("Password:");

    fireEvent.change(email, { target: { value: "test@test.com" } });
    fireEvent.change(password, { target: { value: "test1234" } });

    expect(email).toHaveValue("test@test.com");
    expect(password).toHaveValue("test1234");

    fireEvent.submit(getByTestId("login-form"));
    expect(getByTestId("login-loading")).toBeDefined();
    await wait(() => {
      expect(loginMutationCalled).toBe(false);
      expect(getByTestId("login-error")).toBeDefined();
    });
  });
});
