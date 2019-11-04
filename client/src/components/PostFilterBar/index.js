import React, { useReducer } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { GET_ALL_POSTS } from "../../queries/posts";
import reducer from "../../reducers/stateReducer";

function PostFilterBar({ setState, page }) {
  const [{ title, body, sort, limit }, setFormState] = useReducer(reducer, {
    title: "",
    body: "",
    sort: "",
    limit: 5
  });

  const client = useApolloClient();

  const onSubmit = async e => {
    e.preventDefault();
    const response = await client.query({
      query: GET_ALL_POSTS,
      variables: {
        title,
        body,
        limit: parseInt(limit, 10),
        page,
        sort
      }
    });

    setState({ allPosts: response.data.allPosts, title, body, sort, limit });
  };

  return (
    <div>
      <form action="" onSubmit={onSubmit}>
        <label htmlFor="search-title">Search title:</label>
        <input
          type="text"
          value={title}
          id="search-title"
          onChange={e => setFormState({ title: e.target.value })}
        />
        <label htmlFor="search-body">Search body:</label>
        <input
          type="text"
          value={body}
          id="search-body"
          onChange={e => setFormState({ body: e.target.value })}
        />
        <label htmlFor="search-limit">Number of results per page</label>
        <select
          name="limit"
          id="search-limit"
          value={limit}
          onChange={e => setFormState({ limit: e.target.value })}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>

        <label htmlFor="search-sort">SortBy:</label>
        <select
          name="search-sort"
          id="search-sort"
          value={sort}
          onChange={e => setFormState({ sort: e.target.value })}
        >
          <option value="-createdAt">createdAt</option>
          <option value="title">title</option>
          <option value="author">author</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PostFilterBar;
