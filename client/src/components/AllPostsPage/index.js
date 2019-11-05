import React, { useReducer, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_ALL_POSTS } from "../../queries/posts";
import Pagination from "../Pagination";
import PostListItem from "../PostListItem";
import PostFilterBar from "../PostFilterBar";
import reducer from "../../reducers/stateReducer";
import useFetchNumPublicPosts from "../../hooks/useFetchNumPublicPosts";

export default function AllPostsPage() {
  const [{ allPosts, page, limit, sort, body, title }, setState] = useReducer(
    reducer,
    {
      allPosts: [],
      page: 1,
      limit: 5,
      title: "",
      body: "",
      sort: ""
    }
  );

  const { data, error, loading } = useQuery(GET_ALL_POSTS, {
    fetchPolicy: "cache-and-network",
    variables: {
      page,
      limit: parseInt(limit, 10),
      title,
      body,
      sort
    }
  });

  const { numPosts } = useFetchNumPublicPosts();

  useEffect(() => {
    if (!loading) {
      setState({ allPosts: data.allPosts });
    }
  }, [loading, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  console.log(allPosts);
  return (
    <section>
      <h2>All Posts Page</h2>
      <PostFilterBar setState={setState} page={page} />
      <ul>
        {allPosts.map(post => (
          <PostListItem key={post._id} post={post} type="any-post" />
        ))}
      </ul>
      <Pagination
        page={page}
        setState={setState}
        numPosts={numPosts}
        limit={limit}
      />
    </section>
  );
}
