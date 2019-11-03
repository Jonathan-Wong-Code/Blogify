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
      try {
        const data = cache.readQuery({ query: GET_ALL_POSTS });
        cache.writeQuery({
          query: GET_ALL_POSTS,
          data: {
            ...data,
            allPosts: data.allPosts.filter(post => post._id !== _id)
          }
        });
      } catch (error) {
        // Fail silently if no cache will fetch from network
      }

      try {
        const myPostData = cache.readQuery({ query: GET_MY_POSTS });
        cache.writeQuery({
          query: GET_MY_POSTS,
          data: {
            ...myPostData,
            myPosts: myPostData.myPosts.filter(post => post._id !== _id)
          }
        });
      } catch (error) {
        // Fail silently if no cache will fetch from network
      }
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
      try {
        const data = cache.readQuery({ query: GET_ALL_POSTS });
        cache.writeQuery({
          query: GET_ALL_POSTS,
          data: {
            ...data,
            allPosts: data.allPosts.filter(post => post._id !== _id)
          }
        });
      } catch (error) {
        // Fail silently if no cache will fetch from network
      }

      try {
        const myPostData = cache.readQuery({ query: GET_MY_POSTS });
        cache.writeQuery({
          query: GET_MY_POSTS,
          data: {
            ...myPostData,
            myPosts: myPostData.myPosts.filter(post => post._id !== _id)
          }
        });
      } catch (error) {
        // Fail silently if no cache will fetch from network
      }
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
  if (error) return <p>{error.message}</p>;
  if (myPostError) return <p>{myPostError.message}</p>;
  return (
    <button onClick={handleClick}>
      Delet{loading || myPostLoading ? "ing" : "e"} post
    </button>
  );
}
