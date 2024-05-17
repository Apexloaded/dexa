"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ape1 from "@/assets/nft/1.png";
import Link from "next/link";
import {
  BadgeCheck,
  BarChart2Icon,
  BookmarkIcon,
  EllipsisIcon,
  HandCoinsIcon,
  MessageSquareTextIcon,
  Repeat2Icon,
  Share2Icon,
  ThumbsUpIcon,
  TrendingDownIcon,
} from "lucide-react";
import Button from "../Form/Button";
import ShowMore from "./ShowMore";
import usePost from "@/hooks/post.hook";
import { Post } from "@/interfaces/feed.interface";
import Moment from "react-moment";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/redux.hook";
import { selectPost } from "@/slices/posts/post-selected.slice";
import { formatWalletAddress, getFirstLetters, weiToUnit } from "@/libs/helpers";
import { Diamond } from "../Icons/Others";
import BlueCheckMark from "../Profile/BlueCheck";

type Props = {
  post: Post;
};

function ListPost({ post }: Props) {
  const createdAt = new Date(Number(post.createdAt) * 1000).toISOString();
  const address = formatWalletAddress(post.creator.id);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    router.prefetch(`/${post.creator.username}/mint/${post.id}`);
  }, []);

  const postDetails = () => {
    //router.push(`/${post.creator.username}/mint/${post.id}`);
    dispatch(selectPost(post));
    //router.push(`/${post.creator.username}/mint/${post.id}`);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    // Add any other logic you want to execute when the button is clicked
  };

  return (
    <div
      onClick={postDetails}
      className="hover:bg-light cursor-pointer px-5 pb-2 pt-5"
    >
      <div className="flex items-start space-x-3">
        <div className="min-w-[2.5rem] sticky top-0 flex flex-col gap-3 items-center">
          <Link href={`/${post.creator.username}`} className="">
            <div className="w-10">
              <div className="hover:bg-dark/20 cursor-pointer h-10 w-10 rounded-full absolute"></div>
              {post.creator.pfp ? (
                <Image
                  src={post.creator.pfp}
                  height={400}
                  width={400}
                  alt={"PFP"}
                  className="h-10 w-10 rounded-full"
                />
              ) : (
                <div className="h-10 w-10 bg-white/90 border border-primary rounded-full flex justify-center items-center">
                  <p className="text-base font-semibold text-primary">
                    {getFirstLetters(`${post.creator?.name}`)}
                  </p>
                </div>
              )}
            </div>
          </Link>
          <div className="flex flex-col items-center">
            <Button
              type={"button"}
              kind={"primary"}
              shape={"CIRCLE"}
              title="Tip"
            >
              <Diamond />
            </Button>
            <p className="text-primary text-sm">2</p>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <Link
                href={`/${post.creator.username}`}
                className="flex items-center space-x-1"
              >
                <p className="font-semibold text-sm capitalize text-dark dark:text-white">
                  {post.creator.name}
                </p>
                <BlueCheckMark />
                <p className="text-xs text-medium">@{post.creator.username}</p>
              </Link>
              <p className="text-xs text-medium">
                <Moment fromNow>{createdAt}</Moment>
              </p>
            </div>
            <div>
              <Button
                type={"button"}
                kind={"default"}
                shape={"CIRCLE"}
                className="hover:bg-primary/20 hover:text-primary"
                hoverColor={false}
                title="More"
                onClick={handleButtonClick}
              >
                <EllipsisIcon size={18} />
              </Button>
            </div>
          </div>
          <Link href={`/${post.creator.username}/mint/${post.id}`}>
            {post && post.content && (
              <div className="mt-2">
                <ShowMore
                  onClick={postDetails}
                  data={post.content}
                  dataType={"HTML"}
                  isShowMore={true}
                />
              </div>
            )}

            {post.media &&
              post.media.map((media, index) => (
                <div key={index} className="my-2 rounded-xl overflow-hidden">
                  <Image
                    key={index}
                    src={media.url}
                    height={400}
                    width={600}
                    alt={post.id}
                  />
                </div>
              ))}
          </Link>

          <div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">
                  Mint ID{" "}
                  <span className="text-primary">{Number(post.tokenId)}</span>
                </p>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingDownIcon size={18} className="text-danger" />
                <p className="text-danger text-sm text-right">Bearish</p>
              </div>
            </div>
          </div>
          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-center space-x-1 group">
              <Button
                type={"button"}
                kind={"default"}
                shape={"CIRCLE"}
                className="text-dark group-hover:text-primary group-hover:bg-primary/20"
                hoverColor={false}
                title="Tip"
              >
                <HandCoinsIcon height={18} />
              </Button>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4 lg:space-x-6">
                <div className="flex items-center space-x-1 group">
                  <Button
                    type={"button"}
                    kind={"default"}
                    shape={"CIRCLE"}
                    className="text-dark group-hover:text-primary group-hover:bg-primary/20"
                    hoverColor={false}
                    title="Comments"
                  >
                    <MessageSquareTextIcon height={18} />
                  </Button>
                  <p className="text-sm group-hover:text-primary">12</p>
                </div>
                <div className="flex items-center space-x-1 group">
                  <Button
                    type={"button"}
                    kind={"default"}
                    shape={"CIRCLE"}
                    className="text-dark group-hover:text-primary group-hover:bg-primary/20"
                    hoverColor={false}
                    title="Like"
                  >
                    <ThumbsUpIcon height={18} />
                  </Button>
                  <p className="text-sm group-hover:text-primary">12</p>
                </div>
                <div className="hidden md:flex items-center space-x-1 group">
                  <Button
                    type={"button"}
                    kind={"default"}
                    shape={"CIRCLE"}
                    className="text-dark group-hover:text-primary group-hover:bg-primary/20"
                    hoverColor={false}
                    title="Share"
                  >
                    <Share2Icon height={18} />
                  </Button>
                  <p className="text-sm group-hover:text-primary">12</p>
                </div>
              </div>

              <div className="hidden md:flex items-center space-x-2">
                <div className="flex items-center space-x-1 group">
                  <Button
                    type={"button"}
                    kind={"default"}
                    shape={"CIRCLE"}
                    className="text-dark group-hover:text-primary group-hover:bg-primary/20"
                    hoverColor={false}
                    title="Comments"
                  >
                    <BookmarkIcon height={18} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListPost;
