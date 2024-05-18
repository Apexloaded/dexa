"use client";

import React, { useEffect, useState } from "react";
import ListPost from "../Posts/ListPost/ListPost";
import { Post } from "@/interfaces/feed.interface";
import { useQuery } from "@tanstack/react-query";
import { getAllPost } from "@/services/post.service";
import { useReadContract } from "wagmi";
import { useDexa } from "@/context/dexa.context";
import { timestampToDate, weiToUnit } from "@/libs/helpers";
import { sortPostByDate } from "../Home/Feeds";

type Props = {
  username: string;
};

function UserFeeds({ username }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const { FeedsABI, dexaFeeds } = useDexa();
  const { data: response } = useReadContract({
    abi: FeedsABI,
    address: dexaFeeds,
    functionName: "postByCreator",
    args: [username],
  });

  useEffect(() => {
    if (response) {
      const _posts = response as Post[];
      const sortedPost = sortPostByDate(_posts);
      setPosts(sortedPost);
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

export default UserFeeds;
