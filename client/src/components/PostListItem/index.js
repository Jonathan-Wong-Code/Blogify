import React from "react";
import { Link } from "react-router-dom";

import DeletePostButton from "../DeletePostButton";
import { useAuthState } from "../../context/auth";

export default function PostListItem({ post, type }) {
  const { user } = useAuthState();

  return (
    <li key={post._id}>
      <h3>
        <Link
          to={
            type === "any-post"
              ? `/public-post/${post._id}`
              : `/my-posts/${post._id}`
          }
        >
          {post.title}
        </Link>
      </h3>
      <p>{post.body}</p>
      <p>By: {post.author.name}</p>
      {user && user.role === "admin" && <DeletePostButton id={post._id} />}
    </li>
  );
}
