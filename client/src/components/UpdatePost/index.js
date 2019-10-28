import React from "react";
import PostForm from "../PostForm";
import { useMutation } from "@apollo/react-hooks";

import { UPDATE_POST } from "../../mutations/posts";

export default function UpdatePost() {
  const [updatePost, { loading, error }] = useMutation(UPDATE_POST);

  return (
    <PostForm
      type="create"
      updatePost={updatePost}
      loading={loading}
      error={error}
    />
  );
}
