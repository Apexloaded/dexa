"use client";

import React, { useEffect, useState } from "react";
import { mapPost } from "@/components/Home/Feeds";
import Aside from "@/components/Layouts/Aside";
import Section from "@/components/Layouts/Section";
import PostDetails from "@/components/Posts/PostDetails";
import BackButton from "@/components/ui/BackButton";
import { useDexa } from "@/context/dexa.context";
import { useAppSelector } from "@/hooks/redux.hook";
import { Post } from "@/interfaces/feed.interface";
import { selectedPost } from "@/slices/posts/post-selected.slice";
import { useReadContract } from "wagmi";

type Props = {
  params: { username: string; id: string };
};

function MintDetails({ params }: Props) {
  const { id, username } = params;
  const _post = useAppSelector(selectedPost);
  const { FeedsABI, dexaFeeds } = useDexa();
  const { data } = useReadContract({
    abi: FeedsABI,
    address: dexaFeeds,
    functionName: "postBygnfdId",
    args: [id],
  });
  const [post, setPost] = useState<Post | undefined>(_post);

  useEffect(() => {
    if (data) {
      const content = data as Post;
      const mapData = mapPost(content);
      setPost(mapData);
    }
  }, [data]);

  return (
    <div className="flex space-x-5">
      <Section>
        <div className="py-3 px-2 bg-white xl:bg-white/95 sticky z-50 top-0">
          <div className="flex items-center justify-start space-x-2">
            <BackButton />
            <p className="text-xl font-semibold">Post</p>
          </div>
        </div>
        <div>
          <PostDetails post={post} />
        </div>
      </Section>
      <Aside>
        <div></div>
      </Aside>
    </div>
  );
}

export default MintDetails;
