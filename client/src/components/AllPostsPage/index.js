import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_ALL_POSTS = gql`
  query allPosts(
    $title: String
    $body: String
    $published: Boolean
    $sort: String
    $limit: Float
    $page: Float
  ) {
    allPosts(
      queryParams: {
        title: $title
        body: $body
        published: $published
        sort: $sort
        limit: $limit
        page: $page
      }
    ) {
      title
      body
    }
  }
`;

export default function AllPostsPage() {
  const { data, error, loading } = useQuery(GET_ALL_POSTS, {});
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  console.log(data);
  return (
    <section>
      <h2>All Posts Page</h2>
    </section>
  );
}
