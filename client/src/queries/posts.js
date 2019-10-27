import gql from "graphql-tag";

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
      title
      body
      _id
      author {
        name
      }
    }
  }
`;
