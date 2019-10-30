import React from "react";

export default function SinglePostPage({ post }) {
  return (
    <section>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </section>
  );
}
