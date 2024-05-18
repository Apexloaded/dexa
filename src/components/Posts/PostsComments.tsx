"use client";

import React, { useState } from "react";
import ListPost from "./ListPost/ListPost";
import NewPost from "./NewPost";
import { Post } from "@/interfaces/feed.interface";

function PostsComment() {
  const [posts, setPosts] = useState<Post[]>([]);

  return (
    <div>
      <div className="border-b border-light">
        <NewPost />
      </div>
      {posts.map((post, index) => (
        <div key={index} className="border-b border-light last:border-none">
          <ListPost post={post} />
        </div>
      ))}
    </div>
  );
}

export default PostsComment;
