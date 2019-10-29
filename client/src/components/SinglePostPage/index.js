import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import { GET_PUBLIC_POST, GET_PRIVATE_POST } from "../../queries/posts";
export default function SinglePostPage() {
  const { id } = useParams();
  console.log(id);
  const { data, error, loading } = useQuery(GET_PUBLIC_POST, {
    variables: { id }
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  const { publicPost } = data;

  return (
    <section>
      <h2>{publicPost.title}</h2>
      <p>{publicPost.body}</p>
    </section>
  );
}
