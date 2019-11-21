import React, { useReducer } from "react";
import { CommentContainer, CommentFlex } from "./css";
import { useMutation } from "@apollo/react-hooks";
import {
  CREATE_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  ADD_COMMENT_LIKE
} from "../../mutations/comments";
import { GET_PUBLIC_POST } from "../../queries/posts";
import { useAuthState } from "../../context/auth";
import uuidv4 from "uuid";
import reducer from "./../../reducers/stateReducer";
export default function CommentBox({ comments, post }) {
  const [{ text, updateText, updatedCommentId }, setState] = useReducer(
    reducer,
    {
      text: "",
      isEditing: false,
      updateText: "",
      updatedCommentId: null
    }
  );

  const { user } = useAuthState();

  // CREATE COMMENTS
  const [createComment] = useMutation(CREATE_COMMENT, {
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

  // DELETE COMMENT
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

  // UPDATE COMMENT
  const [
    updateComment,
    { error: updateError, loading: updateLoading }
  ] = useMutation(UPDATE_COMMENT, {
    update: (cache, { data: { updateComment } }) => {
      console.log(updateComment);
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
            comments: publicPost.comments.map(comment => {
              if (comment._id === updateComment._id) {
                return updateComment;
              }

              return comment;
            })
          }
        }
      });
    }
  });

  // ADD COMMENT LIKE

  const [addCommentLike] = useMutation(ADD_COMMENT_LIKE, {
    update: (cache, { data: { addCommentLike } }) => {
      console.log(addCommentLike);
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
            comments: publicPost.comments.map(comment => {
              if (comment._id === addCommentLike._id) {
                return addCommentLike;
              }

              return comment;
            })
          }
        }
      });
    }
  });

  // CREATE COMMENT
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
          likes: [],
          author: {
            __typename: "User",
            name: user.name,
            _id: uuidv4()
          }
        }
      }
    });

    setState({ text: "" });
  };

  // DELETE COMMENTS
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

  const onUpdateSubmit = async (e, commentId) => {
    e.preventDefault();
    setState({ updatedCommentId: null });

    await updateComment({
      variables: {
        commentId,
        text: updateText
      },

      optimisticResponse: {
        __typename: "Mutation",
        updateComment: {
          __typename: "Post",
          text: updateText,
          _id: commentId,
          author: {
            __typename: "User",
            name: user.name,
            _id: uuidv4()
          }
        }
      }
    });
  };

  // ADD LIKE

  const onCommentLike = commentId => {
    addCommentLike({
      variables: {
        commentId
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
              {user._id === comment.author._id && (
                <div>
                  <button onClick={() => onDeleteClick(comment._id)}>x</button>
                  <button
                    onClick={() =>
                      setState({
                        isEditing: true,
                        updatedCommentId: comment._id
                      })
                    }
                  >
                    edit
                  </button>
                </div>
              )}
            </CommentFlex>

            {updatedCommentId !== comment._id ? (
              <>
                <p>Comment: {comment.text}</p>
                <button onClick={() => onCommentLike(comment._id)}>
                  Like
                </button>{" "}
                <span>{comment.likes.length} likes</span>
              </>
            ) : (
              <form action="" onSubmit={e => onUpdateSubmit(e, comment._id)}>
                <label htmlFor="comment-edit">edit</label>
                <input
                  type="text"
                  id="comment-id"
                  value={updateText}
                  onChange={e => setState({ updateText: e.target.value })}
                />
              </form>
            )}
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
            onChange={e => setState({ text: e.target.value })}
          />
          <button>reply</button>
        </form>
      )}
    </CommentContainer>
  );
}
