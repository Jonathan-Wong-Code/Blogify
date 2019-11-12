import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { useState } from "react";

import { useAuthState } from "../../context/auth";
import { BlogSection, Wrapper, Blog, H2 } from "./css";
import { ADD_POST_LIKE } from "../../mutations/posts";
import { GET_PUBLIC_POST } from "../../queries/posts";

import CommentBox from "../CommentBox";
export default function SinglePostPage({ post }) {
  const [showComments, setShowComments] = useState(false);

  const { user } = useAuthState();

  const [addPostLike] = useMutation(ADD_POST_LIKE, {
    update: (cache, { data: { addPostLike } }) => {
      const { publicPost } = cache.readQuery({
        query: GET_PUBLIC_POST,
        variables: { id: post._id }
      });

      cache.writeQuery({
        query: GET_PUBLIC_POST,
        variables: { id: post._id },
        data: {
          publicPost: {
            ...publicPost,
            likes: [
              ...publicPost.likes,
              { __typename: "User", _id: user._id, name: user.name }
            ]
          }
        }
      });
    }
  });

  const onLikeClick = () => {
    addPostLike({
      variables: { postId: post._id }
    });
  };

  return (
    <BlogSection>
      <Wrapper>
        <Blog>
          <H2>{post.title}</H2>
          <p>{post.body}</p>
          {post.likes.length > 0 && <p>liked by: {post.likes.length} person</p>}
          <div className="buttons">
            <button onClick={() => setShowComments(prevState => !prevState)}>
              Comments
            </button>
            <button onClick={onLikeClick}>Like</button>
          </div>
        </Blog>

        {showComments && <CommentBox comments={post.comments} post={post} />}
      </Wrapper>
    </BlogSection>
  );
}
