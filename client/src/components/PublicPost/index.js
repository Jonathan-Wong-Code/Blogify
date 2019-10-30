import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import { GET_PUBLIC_POST } from "../../queries/posts";
import SinglePostPage from "../SinglePostPage";

export default function PublicPost() {
  const { id } = useParams();
  const { error, data, loading } = useQuery(GET_PUBLIC_POST, {
    variables: { id }
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  const { publicPost: post } = data;
  return (
    <>
      <SinglePostPage post={post} />
    </>
  );
}
