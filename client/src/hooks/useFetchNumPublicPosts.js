import { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_NUM_PUBLIC_POSTS } from "../queries/posts";
import { useApolloClient } from "@apollo/react-hooks";

function useFetchNumPublicPosts() {
  const [numPosts, setNumPosts] = useState(0);
  const client = useApolloClient();

  useEffect(() => {
    let mounted = true;
    const getNumPosts = async () => {
      try {
        const response = await client.query({ query: GET_NUM_PUBLIC_POSTS });
        if (mounted) {
          setNumPosts(response.data.getNumPublicPosts.numPosts);
        }
      } catch (error) {
        throw new Error(error);
      }
    };
    getNumPosts();

    return () => {
      mounted = false;
    };
  }, [client, setNumPosts]);

  return { numPosts };
}

export default useFetchNumPublicPosts;
