import React from "react";
import DeletePostButton from "../DeletePostButton";
import { useAuthState } from "../../context/auth";

export default function PostListItem({ post }) {
  const { user } = useAuthState();

  return (
    <li key={post._id}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <p>By: {post.author.name}</p>
      {user && user.role === "admin" && <DeletePostButton id={post._id} />}
    </li>
  );
}
