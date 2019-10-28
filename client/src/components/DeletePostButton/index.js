import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_ANY_POST, DELETE_MY_POST } from "../../mutations/posts";
import { GET_ALL_POSTS, GET_MY_POSTS } from "../../queries/posts";

export default function DeletePostButton({ id, type }) {
  // Delete for Admin
  const [deleteAnyPost, { loading, error }] = useMutation(DELETE_ANY_POST, {
    update: (
      cache,
      {
        data: {
          deleteAnyPost: { _id }
        }
      }
    ) => {
      const { allPosts } = cache.readQuery({ query: GET_ALL_POSTS });
      cache.writeQuery({
        query: GET_ALL_POSTS,
        data: { allPosts: allPosts.filter(post => post._id !== _id) }
      });
    }
  });

  // Delete for user
  const [
    deleteMyPost,
    { loading: myPostLoading, error: myPostError }
  ] = useMutation(DELETE_MY_POST, {
    update: (
      cache,
      {
        data: {
          deleteMyPost: { _id }
        }
      }
    ) => {
      const { myPosts } = cache.readQuery({ query: GET_MY_POSTS });
      cache.writeQuery({
        query: GET_MY_POSTS,
        data: { myPosts: myPosts.filter(post => post._id !== _id) }
      });
    }
  });

  const handleClick = () => {
    if (type === "any-post") {
      return deleteAnyPost({
        variables: { id },

        optimisticResponse: {
          __typename: "Mutation",
          deleteAnyPost: {
            __typename: "Post",
            _id: id
          }
        }
      });
    }

    return deleteMyPost({
      variables: { id },

      optimisticResponse: {
        __typename: "MUTATION",
        deleteMyPost: {
          __typename: "Post",
          _id: id
        }
      }
    });
  };
  if (error || myPostError) return <p>{error.message}</p>;
  return (
    <button onClick={handleClick}>
      Delet{loading || myPostLoading ? "ing" : "e"} post
    </button>
  );
}
