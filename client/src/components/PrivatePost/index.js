import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import { GET_PRIVATE_POST } from "../../queries/posts";
import SinglePostPage from "../SinglePostPage";
import DeletePostButton from "../DeletePostButton";

export default function PrivatePost() {
  const { id } = useParams();

  const { error, data, loading } = useQuery(GET_PRIVATE_POST, {
    variables: { id }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  const { privatePost: post } = data;
  return (
    <>
      <div className="post-container">
        <SinglePostPage post={post} />
        <Link to={`/update-post/${post._id}`}> Edit post </Link>
        <DeletePostButton type="my-post" />
      </div>
    </>
  );
}
