import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_ALL_POSTS } from "../../queries/posts";

import { useAuthState } from "../../context/auth";
import DeletePostButton from "../DeletePostButton";

export default function AllPostsPage() {
  const { data, error, loading } = useQuery(GET_ALL_POSTS, {
    fetchPolicy: "cache-first"
  });

  const { user } = useAuthState();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  const { allPosts } = data;

  return (
    <section>
      <h2>All Posts Page</h2>
      <ul>
        {allPosts.map(post => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p>By: {post.author.name}</p>
            {user && user.role === "admin" && (
              <DeletePostButton id={post._id} />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
