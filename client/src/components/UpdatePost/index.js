import React from "react";
import PostForm from "../PostForm";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

import { UPDATE_POST } from "../../mutations/posts";

export default function UpdatePost() {
  const [updatePost, { loading, error }] = useMutation(UPDATE_POST);
  const history = useHistory();

  return (
    <PostForm
      type="create"
      updatePost={updatePost}
      loading={loading}
      error={error}
    />
  );
}
