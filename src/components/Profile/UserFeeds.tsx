"use client";

import React from "react";
import ListPost from "../Posts/ListPost/ListPost";
import { Post } from "@/interfaces/feed.interface";

type Props = {
  posts: Post[];
};

function UserFeeds({ posts }: Props) {
  return (
    <div>
      {posts
        .filter((f) => !f.isReminted)
        .map((post: Post, index: number) => (
          <div key={index} className="border-b border-light last:border-none">
            <ListPost post={post} />
          </div>
        ))}
    </div>
  );
}

export default UserFeeds;
