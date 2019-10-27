import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_ALL_POSTS } from "../../queries/posts";

export default function AllPostsPage() {
  const { data, error, loading } = useQuery(GET_ALL_POSTS, {});
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  console.log(data);
  return (
    <section>
      <h2>All Posts Page</h2>
    </section>
  );
}
