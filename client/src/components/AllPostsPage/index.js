import React, { useReducer, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_ALL_POSTS } from "../../queries/posts";
import PostListItem from "../PostListItem";
import PostFilterBar from "../PostFilterBar";
import reducer from "../../reducers/stateReducer";

export default function AllPostsPage() {
  const [{ allPosts }, setState] = useReducer(reducer, {
    allPosts: []
  });

  const { data, error, loading } = useQuery(GET_ALL_POSTS, {
    fetchPolicy: "cache-and-network"
  });

  useEffect(() => {
    if (!loading) {
      setState({ allPosts: data.allPosts });
    }
  }, [loading, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <section>
      <h2>All Posts Page</h2>
      <PostFilterBar setState={setState} />
      <ul>
        {allPosts.map(post => (
          <PostListItem key={post._id} post={post} type="any-post" />
        ))}
      </ul>
    </section>
  );
}
