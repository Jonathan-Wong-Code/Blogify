import React from "react";
import { GET_MY_POSTS } from "../../queries/posts";
import { useQuery } from "@apollo/react-hooks";
import PostListItem from "../PostListItem";
export default function MyPostsPage() {
  const { data, error, loading } = useQuery(GET_MY_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  const { myPosts } = data;
  return (
    <section>
      <h2>My Current Posts</h2>
      <ul>
        {myPosts.map(post => (
          <PostListItem key={post._id} post={post} type="myPost" />
        ))}
      </ul>
    </section>
  );
}
