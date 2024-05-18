"use client";

import React, { useEffect, useState } from "react";
import ListPost from "../Posts/ListPost/ListPost";
import { Post } from "@/interfaces/feed.interface";

type Props = {
  posts: Post[];
};

function Reminted({ posts }: Props) {
  const [reminted, setReminted] = useState<Post[]>([]);
  useEffect(() => {
    if (posts) {
      const filtered = posts.filter((f) => f.isReminted);
      setReminted(filtered);
    }
  }, [posts]);
  return (
    <div>
      {reminted.length > 0 ? (
        <>
          {reminted.map((post: Post, index: number) => (
            <div key={index} className="border-b border-light last:border-none">
              <ListPost post={post} />
            </div>
          ))}
        </>
      ) : (
        <div>
          <div className="py-20 text-center">
            <p className="text-2xl font-semibold">Nothing in trash</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reminted;
