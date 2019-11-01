import React, { useReducer } from "react";
import uuidv4 from "uuid";
import { useAuthState } from "../../context/auth";
import reducer from "../../reducers/stateReducer";

function PostForm({
  type,
  editedPost = null,
  loading,
  error,
  createPost = () => {},
  updatePost = () => {}
}) {
  const [{ title, body }, setState] = useReducer(reducer, {
    title: editedPost ? editedPost.title : "",
    body: editedPost ? editedPost.body : ""
  });

  const { user } = useAuthState();
  const onSubmit = e => {
    e.preventDefault();
    if (type === "create") {
      return createPost({
        variables: {
          title,
          body
        },

        optimisticResponse: {
          __typename: "Mutation",
          createPost: {
            __typename: "Post",
            _id: uuidv4(),
            title,
            body,

            author: {
              __typename: "User",
              name: user.name
            }
          }
        }
      });
    }

    updatePost({
      variables: {
        title,
        body,
        id: editedPost._id,
        published: editedPost ? editedPost.published : true
      },

      optimisticResponse: {
        __typename: "Mutation",
        updatePost: {
          __typename: "Post",
          title,
          body,
          published: editedPost ? editedPost.published : true,
          _id: uuidv4(),
          author: {
            __typename: "User",
            name: user.name
          }
        }
      }
    });
  };

  if (loading)
    return <p data-testid="post-form-mutation-loading">Loading...</p>;
  return (
    <section data-testid="post-form-section">
      <form action="" onSubmit={onSubmit} data-testid="post-form-form">
        <label htmlFor="post-title">Title:</label>
        <input
          type="text"
          id="post-title"
          value={title}
          onChange={e => setState({ title: e.target.value })}
        />
        <label htmlFor="post-body">Body:</label>
        <textarea
          name="post-body"
          id="post-body"
          cols="50"
          rows="20"
          value={body}
          onChange={e => setState({ body: e.target.value })}
        />
        <button>Submit</button>
      </form>
      {error && <p data-testid="post-form-mutation-error">{error.message}</p>}
    </section>
  );
}

export default PostForm;
