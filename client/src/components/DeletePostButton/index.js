import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_POST } from "../../mutations/posts";
import { GET_ALL_POSTS } from "../../queries/posts";
export default function DeletePostButton({ id }) {
  const [deleteAnyPost, { loading, error }] = useMutation(DELETE_POST, {
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

  const handleClick = () => {
    deleteAnyPost({
      variables: { id },

      optimisticResponse: {
        __typename: "Mutation",
        deleteAnyPost: {
          __typename: "Post",
          _id: id
        }
      }
    });
  };
  if (error) return <p>{error.message}</p>;
  return (
    <button onClick={handleClick}>Delet{loading ? "ing" : "e"} post</button>
  );
}
