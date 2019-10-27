import React from "react";
import PostForm from "../PostForm";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

import { CREATE_POST } from "../../mutations/posts";
import { GET_ALL_POSTS } from "../../queries/posts";

export default function CreatePost() {
  const [createPost, { loading, error }] = useMutation(CREATE_POST, {
    update: (cache, { data: { createPost: post } }) => {
      const { allPosts } = cache.readQuery({ query: GET_ALL_POSTS });
      cache.writeQuery({
        query: GET_ALL_POSTS,
        data: { allPosts: [...allPosts, post] }
      });
    },

    onCompleted: () => history.push("/")
  });
  const history = useHistory();

  return (
    <PostForm
      type="create"
      createPost={createPost}
      loading={loading}
      error={error}
    />
  );
}
