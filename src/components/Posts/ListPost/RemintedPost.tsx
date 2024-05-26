import { Post } from "@/interfaces/feed.interface";
import React, { useEffect, useState } from "react";
import CreatorPFP from "./CreatorPFP";
import CreatorName from "./CreatorName";
import { timestampToDate } from "@/libs/helpers";
import Link from "next/link";
import Image from "next/image";
import ShowMore from "../ShowMore";
import { useDexa } from "@/context/dexa.context";
import { useReadContract } from "wagmi";
import { mapPost } from "@/components/Home/Feeds";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/redux.hook";
import { selectPost } from "@/slices/posts/post-selected.slice";
type Props = {
  postId?: string;
  postItem?: Post;
};
function RemintedPost({ postId, postItem }: Props) {
  const [post, setPost] = useState<Post | undefined>(postItem);
  const { FeedsABI, dexaFeeds } = useDexa();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: response } = useReadContract({
    abi: FeedsABI,
    address: dexaFeeds,
    functionName: "getPost",
    args: [`${postId}`],
    query: {
      enabled: postId ? true : false,
    },
  });

  useEffect(() => {
    if (response) {
      const data = response as Post;
      const postData = mapPost(data);
      setPost(postData);
    }
  }, [response]);

  useEffect(() => {
    router.prefetch(`/${post?.creator.username}/mint/${post?.id}`);
  }, [post]);

  const postDetails = () => {
    if (post) {
      router.push(`/${post.creator.username}/mint/${post.id}`);
      dispatch(selectPost(post));
      //router.push(`/${post.creator.username}/mint/${post.id}`);
    }
  };

  return (
    <div
      role="button"
      onClick={(e) => {
        postDetails();
        e.stopPropagation();
      }}
      className="hover:bg-light cursor-pointer border border-medium/30 rounded-2xl pt-3"
    >
      <div className="flex gap-x-2 items-center px-3">
        <CreatorPFP
          username={post?.creator.username}
          name={post?.creator.name}
          pfp={post?.creator.pfp}
        />
        <CreatorName
          name={post?.creator.name}
          username={post?.creator.username}
          createdAt={post?.createdAt}
        />
      </div>
      <div>
        {/* <Link href={`/${post?.creator.username}/mint/${post?.id}`}> */}
          <div className="px-3">
            {post && post.content && (
              <div className="mt-2">
                <ShowMore
                  onClick={postDetails}
                  data={post.content}
                  isShowMore={true}
                />
              </div>
            )}
          </div>
          {post?.media &&
            post.media.map((media, index) => (
              <div key={index} className="pt-2 rounded-xl overflow-hidden">
                <Image
                  key={index}
                  src={media.url}
                  height={400}
                  width={600}
                  alt={post.id}
                  priority
                  className="size-full"
                />
              </div>
            ))}
        {/* </Link> */}
      </div>
    </div>
  );
}

export default RemintedPost;
