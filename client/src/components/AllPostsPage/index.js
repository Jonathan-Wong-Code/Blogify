import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_ALL_POSTS } from "../../queries/posts";
import PostListItem from "../PostListItem";
export default function AllPostsPage() {
  const { data, error, loading } = useQuery(GET_ALL_POSTS, {
    fetchPolicy: "cache-first"
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  const { allPosts } = data;

  return (
    <section>
      <h2>All Posts Page</h2>
      <ul>
        {allPosts.map(post => (
          <PostListItem key={post._id} post={post} type="any-post" />
        ))}
      </ul>
    </section>
  );
}
