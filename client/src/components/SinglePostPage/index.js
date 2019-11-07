import React from "react";
import { BlogSection, Wrapper, Blog, H2 } from "./css";
import { useState } from "react";
import CommentBox from "../CommentBox";
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

        {showComments && <CommentBox comments={post.comments} post={post} />}
      </Wrapper>
    </BlogSection>
  );
}
