import React from "react";
import { MockedProvider } from "@apollo/react-testing";
import "@testing-library/jest-dom/extend-expect";
import { renderRouter } from "../../../testUtils/utils";
import { fireEvent, wait, cleanup } from "@testing-library/react";

import UpdatePost from "..";
import { useAuthState } from "../../../context/auth";

import { GET_PRIVATE_POST } from "../../../queries/posts";
import { UPDATE_POST } from "../../../mutations/posts";
import { GraphQLError } from "graphql";

export const post = {
  title: "testTitle",
  body: "Testing body",
  _id: "test1234",
  published: true,
  __typename: "Post",
  author: {
    __typename: "User",
    name: "test"
  }
};

export const updatePost = {
  __typename: "Post",
  title: "Testing title mutation",
  body: "Testing body mutation",
  _id: "test1234",
  published: true,
  author: {
    __typename: "User",
    name: "Jon"
  }
};

export let updateMutationCalled;

export const updateSuccess = [
  {
    request: {
      query: GET_PRIVATE_POST,
      variables: {
        id: post._id
      }
    },

    result: {
      data: {
        privatePost: post
      }
    }
  },
  {
    request: {
      query: UPDATE_POST,
      variables: {
        title: "Testing title mutation",
        body: "Testing body mutation",
        published: true,
        id: "test1234"
      }
    },

    result: () => {
      updateMutationCalled = true;
      return { data: { updatePost } };
    }
  }
];

const updateFailure = [
  {
    request: {
      query: GET_PRIVATE_POST,
      variables: {
        id: post._id
      }
    },

    result: {
      data: {
        privatePost: post
      }
    }
  },
  {
    request: {
      query: UPDATE_POST,
      variables: {
        title: updatePost.title,
        body: updatePost.body,
        id: updatePost._id,
        published: updatePost.published
      }
    },

    result: {
      errors: [new GraphQLError("Error")]
    }
  }
];

const queryFailure = [
  {
    request: {
      query: GET_PRIVATE_POST,
      variables: {
        id: post._id
      }
    },

    result: {
      errors: [new GraphQLError("Query error")]
    }
  }
];

jest.mock("../../../context/auth.js");

useAuthState.mockImplementation(() => ({ user: { name: "Jon" } }));

const match = { params: { id: "test1234" } };
const history = { push: jest.fn() };

beforeEach(() => {
  jest.clearAllMocks();
  updateMutationCalled = false;
});

afterEach(cleanup);

describe("<UpdatePost>", () => {
  it("renders with the data from query mutation", async () => {
    const { getByTestId, queryByTestId, getByLabelText } = renderRouter(
      <MockedProvider mocks={updateSuccess} addTypename={false}>
        <UpdatePost match={match} history={history} />
      </MockedProvider>
    );
    //Test loading state works.
    expect(getByTestId("update-post-query-loading")).toBeDefined();
    expect(queryByTestId("post-form-section")).toBeNull();

    await wait();
    expect(getByTestId("post-form-section")).toBeDefined();
    expect(queryByTestId("update-post-query-loading")).toBeNull();
    expect(getByLabelText("Title:")).toHaveValue(post.title);
    expect(getByLabelText("Body:")).toHaveValue(post.body);
  });

  it("Allows the user to fill in the form data to update the post", async () => {
    const { getByTestId, getByLabelText } = renderRouter(
      <MockedProvider mocks={updateSuccess} addTypename={false}>
        <UpdatePost match={match} history={history} />
      </MockedProvider>
    );
    // await query data
    await wait();

    const titleField = getByLabelText("Title:");
    const bodyField = getByLabelText("Body:");

    fireEvent.change(titleField, {
      target: { value: "Testing title mutation" }
    });

    fireEvent.change(bodyField, { target: { value: "Testing body mutation" } });

    expect(titleField).toHaveValue("Testing title mutation");
    expect(bodyField).toHaveValue("Testing body mutation");

    fireEvent.submit(getByTestId("post-form-form"));
    // wait for mutation
    await wait();

    expect(updateMutationCalled).toBe(true);
    expect(history.push).toHaveBeenCalledTimes(1);
  });

  it("Returns an error from the graphQL API when update is attempted", async () => {
    const { getByTestId, queryByTestId, getByLabelText } = renderRouter(
      <MockedProvider mocks={updateFailure} addTypename={false}>
        <UpdatePost match={match} history={history} />
      </MockedProvider>
    );
    // Wait for query data
    await wait();
    expect(queryByTestId("post-form-mutation-error")).toBeNull();
    const titleField = getByLabelText("Title:");
    const bodyField = getByLabelText("Body:");

    fireEvent.change(titleField, {
      target: { value: "Testing title mutation" }
    });

    fireEvent.change(bodyField, { target: { value: "Testing body mutation" } });
    fireEvent.submit(getByTestId("post-form-form"));
    await wait();
    expect(getByTestId("post-form-mutation-error")).toHaveTextContent("Error");
    expect(getByTestId("post-form-mutation-error")).toBeDefined();
    expect(updateMutationCalled).toBe(false);
    expect(history.push).not.toHaveBeenCalled();
  });

  it("Should return an error from the GraphQL query", async () => {
    const { getByTestId, queryByTestId } = renderRouter(
      <MockedProvider mocks={queryFailure} addTypename={false}>
        <UpdatePost match={match} history={history} />
      </MockedProvider>
    );
    expect(getByTestId("update-post-query-loading")).toBeDefined();
    expect(queryByTestId("update-post-query-error")).toBeNull();
    await wait();
    expect(queryByTestId("update-post-query-loading")).toBeNull();
    expect(queryByTestId("update-post-query-error")).toBeDefined();
  });
});
