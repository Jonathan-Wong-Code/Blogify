import React from "react";
import { MockedProvider } from "@apollo/react-testing";
import "@testing-library/jest-dom/extend-expect";
import { renderContextRouter } from "../../../testUtils/utils";
import { UPDATE_POST } from "../../../mutations/posts";
import { GET_PRIVATE_POST } from "../../../queries/posts";
import { Route, MemoryRouter } from "react-router-dom";
import { render, fireEvent, wait, cleanup, act } from "@testing-library/react";

import UpdatePost from "..";
import { GraphQLError } from "graphql";

const post = {
  title: "testTitle",
  body: "Testing body",
  _id: "test1234",
  __typename: "Post",
  author: {
    __typename: "User",
    name: "test"
  }
};

let updateMutationCalled;

const updateSuccess = [
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
        title: "testTitle",
        body: "Testing body"
      }
    },

    result: () => {
      updateMutationCalled = true;
      return { data: { updatePost: post } };
    }
  }
];

const match = { params: { id: "test1234" } };

beforeEach(() => {
  jest.clearAllMocks();
  updateMutationCalled = false;
});

afterEach(cleanup);

describe("<UpdatePost>", () => {
  it("renders", async () => {
    const { container } = renderContextRouter(
      <MockedProvider mocks={updateSuccess} addTypename={false}>
        <UpdatePost match={match} />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();

    await wait(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
