import React from "react";
import PostForm from "../PostForm";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useParams, useHistory } from "react-router-dom";

import { UPDATE_POST } from "../../mutations/posts";
import { GET_PRIVATE_POST } from "../../queries/posts";

export default function UpdatePost() {
  const { id } = useParams();
  const history = useHistory();

  const [
    updatePost,
    { loading: updateLoading, error: updateError }
  ] = useMutation(UPDATE_POST, {
    update: (cache, { data: { updatePost } }) => {
      const post = cache.readQuery({
        query: GET_PRIVATE_POST,
        variables: { id: updatePost._id }
      });

      // We can pass variables after our query if it takes params
      cache.writeData({
        query: GET_PRIVATE_POST,
        variables: { id: updatePost._id },
        data: { privatePost: updatePost }
      });
    },

    onCompleted: ({ updatePost }) => {
      console.log(updatePost);
      history.push(`/my-posts/${updatePost._id}`);
    }
  });

  const { error, data, loading } = useQuery(GET_PRIVATE_POST, {
    variables: { id }
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  const { privatePost: editedPost } = data;

  return (
    <PostForm
      type="update"
      updatePost={updatePost}
      editedPost={editedPost}
      loading={updateLoading}
      error={updateError}
    />
  );
}
