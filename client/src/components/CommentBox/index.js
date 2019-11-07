import React, { useState } from "react";
import { CommentContainer, CommentFlex } from "./css";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_COMMENT, DELETE_COMMENT } from "../../mutations/comments";
import { GET_PUBLIC_POST } from "../../queries/posts";
import { useAuthState } from "../../context/auth";
import uuidv4 from "uuid";

export default function CommentBox({ comments, post }) {
  const [text, setText] = useState("");

  const { user } = useAuthState();

  const [createComment, { error, loading }] = useMutation(CREATE_COMMENT, {
    update: (cache, { data: { createComment } }) => {
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
            comments: [...comments, createComment]
          }
        }
      });
    }
  });

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    update: (
      cache,
      {
        data: {
          deleteComment: { _id }
        }
      }
    ) => {
      const { publicPost } = cache.readQuery({
        query: GET_PUBLIC_POST,
        variables: { id: post._id }
      });

      cache.writeQuery({
        query: GET_PUBLIC_POST,
        data: {
          publicPost: {
            ...publicPost,
            comments: publicPost.comments.filter(post => post._id !== _id)
          }
        }
      });
    }
  });

  const onSubmit = e => {
    e.preventDefault();

    createComment({
      variables: {
        text,
        postId: post._id
      },

      optimisticResponse: {
        __typename: "Mutation",
        createComment: {
          __typename: "Comment",
          text,
          _id: uuidv4(),
          author: {
            __typename: "User",
            name: user.name,
            _id: uuidv4()
          }
        }
      }
    });

    setText("");
  };

  const onDeleteClick = commentId => {
    deleteComment({
      variables: {
        commentId
      },

      optimisticResponse: {
        __typename: "Mutation",
        deleteComment: {
          __typename: "Post",
          _id: commentId
        }
      }
    });
  };

  return (
    <CommentContainer className="comment-box">
      <ul>
        {comments.map(comment => (
          <li key={comment._id}>
            <CommentFlex>
              <h4>By: {comment.author.name}</h4>
              <button onClick={() => onDeleteClick(comment._id)}>x</button>
            </CommentFlex>

            <p>Comment: {comment.text}</p>
          </li>
        ))}
      </ul>
      {user && (
        <form action="" onSubmit={onSubmit}>
          <label htmlFor="comment-reply">Reply:</label>
          <input
            type="text"
            id="comment-reply"
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <button>reply</button>
        </form>
      )}
    </CommentContainer>
  );
}
