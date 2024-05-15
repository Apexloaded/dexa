"use client";

import React, { useEffect, useState } from "react";
import ListPost from "../Posts/ListPost";
import { Post } from "@/interfaces/feed.interface";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/config/env";
import { getAllPost } from "@/actions/post.action";

function Feeds() {
  const [posts, setPosts] = useState<Post[]>([]);
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["feeds"],
    queryFn: async () => await getAllPost(),
  });

  useEffect(() => {
    if (response && response.statusCode == 200) {
      const posts = response.data;
      setPosts(posts);
    }
  }, [response]);

  return (
    <div>
      <div className="py-3 border-b border-light cursor-pointer hover:bg-light">
        <p className="text-primary text-center text-sm">Show 98 posts</p>
      </div>
      {posts.map((post: Post, index: number) => (
        <div key={index} className="border-b border-light last:border-none">
          <ListPost post={post} />
        </div>
      ))}
    </div>
  );
}

export default Feeds;
