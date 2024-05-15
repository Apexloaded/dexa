"use client";

import React, { useState } from "react";
import ListPost from "../Posts/ListPost";
import NewPost from "./NewPost";

function PostsComment() {
  const [posts, setPosts] = useState([1, 2, 3, 4, 5]);

  return (
    <div>
      <div className="border-b border-light">
        <NewPost />
      </div>
      {posts.map((post, index) => (
        <div key={index} className="border-b border-light last:border-none">
          <ListPost />
        </div>
      ))}
    </div>
  );
}

export default PostsComment;
