import gql from "graphql-tag";
import { POST_W_AUTHOR } from "../fragments";

export const GET_ALL_POSTS = gql`
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
      ...PostWithAuthor
    }
  }
  ${POST_W_AUTHOR}
`;

export const GET_MY_POSTS = gql`
  query myPosts(
    $title: String
    $body: String
    $published: Boolean
    $sort: String
    $limit: Float
    $page: Float
  ) {
    myPosts(
      queryParams: {
        title: $title
        body: $body
        published: $published
        sort: $sort
        limit: $limit
        page: $page
      }
    ) {
      ...PostWithAuthor
    }
  }
  ${POST_W_AUTHOR}
`;
