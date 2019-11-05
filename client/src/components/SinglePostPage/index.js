import React from "react";
import { BlogSection, Wrapper, Blog, H2, CommentBox } from "./css";
import { useState } from "react";

export default function SinglePostPage({ post }) {
  const [showComments, setShowComments] = useState(false);
  console.log(post);
  return (
    <BlogSection>
      <Wrapper>
        <Blog>
          <H2>{post.title}</H2>
          <p>{post.body}</p>
          <div className="buttons">
            <button onClick={() => setShowComments(prevState => !prevState)}>
              Comments
            </button>
            <button>Like</button>
          </div>
        </Blog>

        {showComments && (
          <CommentBox className="comment-box">
            <ul>
              {post.comments.map(comment => (
                <li key={comment._id}>
                  <h4>{comment.author.name}</h4>
                  <p>{comment.text}</p>
                </li>
              ))}
            </ul>
          </CommentBox>
        )}
      </Wrapper>
    </BlogSection>
  );
}
