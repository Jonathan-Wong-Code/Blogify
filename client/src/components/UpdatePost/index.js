import React from "react";
import PostForm from "../PostForm";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { UPDATE_POST } from "../../mutations/posts";
import { GET_PRIVATE_POST } from "../../queries/posts";

function UpdatePost({ history, match }) {
  const { id } = match.params;

  const [
    updatePost,
    { loading: updateLoading, error: updateError }
  ] = useMutation(UPDATE_POST, {
    update: (cache, { data: { updatePost } }) => {
      // We can pass variables after our query if it takes params
      cache.writeData({
        query: GET_PRIVATE_POST,
        variables: { id: updatePost._id },
        data: { privatePost: updatePost }
      });
    },

    onCompleted: ({ updatePost }) => {
      history.push(`/my-posts/${updatePost._id}`);
    }
  });

  const { error, data, loading } = useQuery(GET_PRIVATE_POST, {
    variables: { id }
  });
  if (loading) return <p data-testid="update-post-query-loading">Loading...</p>;
  if (error)
    return <p data-testid="update-post-query-error">{error.message}</p>;
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

export default UpdatePost;
