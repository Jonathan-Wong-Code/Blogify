import React from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { GET_ALL_POSTS } from "../../queries/posts";
function PostFilterBar({ setState }) {
  const client = useApolloClient();

  const handleClick = async () => {
    const response = await client.query({
      query: GET_ALL_POSTS,
      variables: {
        title: "Hello"
      }
    });

    setState({ allPosts: response.data.allPosts });
  };

  return (
    <div>
      Poster filter bar whew!
      <button onClick={handleClick}>Clickme</button>
    </div>
  );
}

export default PostFilterBar;
