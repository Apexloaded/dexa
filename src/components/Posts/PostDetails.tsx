import React, { useEffect, useState } from "react";
import Image from "next/image";
import ape1 from "@/assets/nft/1.png";
import Link from "next/link";
import {
  BadgeCheck,
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
import PostsComment from "./PostsComments";
import { Post } from "@/interfaces/feed.interface";
import Moment from "react-moment";
import TipModal from "./TipModal";
import { walletToLowercase } from "@/libs/helpers";
import { useAccount } from "wagmi";

type Props = {
  post?: Post;
};

function PostDetails({ post }: Props) {
  const { address } = useAccount();
  const [tipModal, setTipModal] = useState<boolean>(false);
  const handleClick = () => {};

  return (
    <div className="">
      <div className="flex items-center justify-between px-5">
        <div className="flex items-center space-x-2">
          <Link href={`/${post?.creator.username}`} className="relative">
            <div className="hover:bg-dark/20 cursor-pointer h-10 w-10 rounded-full absolute"></div>
            <Image
              height={100}
              width={100}
              alt=""
              className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-gray-700"
              src={ape1}
            />
          </Link>
          <div className="flex flex-col">
            <Link
              href={`/${post?.creator.username}`}
              className="flex items-center space-x-1"
            >
              <p className="font-semibold text-sm capitalize text-dark dark:text-white">
                {post?.creator.name}
              </p>
              <BadgeCheck size={18} className="fill-primary stroke-white" />
            </Link>
            <Link
              href={`/${post?.creator.username}`}
              className="text-xs text-medium"
            >
              @{post?.creator.username}
            </Link>
          </div>
        </div>

        <div>
          <Button
            type={"button"}
            kind={"default"}
            shape={"CIRCLE"}
            className="hover:bg-primary/20 hover:text-primary"
            hoverColor={false}
            title="Media"
          >
            <EllipsisIcon size={18} />
          </Button>
        </div>
      </div>
      {post && (
        <div className="mt-2 px-5">
          <ShowMore data={post.content} dataType={"HTML"} />
          <div className="rounded-xl mt-2 overflow-hidden">
            {post?.media.map((media, index) => (
              <Image
                key={index}
                src={media.url}
                height={500}
                width={1000}
                alt={post.id}
              />
            ))}
          </div>
        </div>
      )}

      {post &&
        walletToLowercase(`${post.creator.id}`) !=
          walletToLowercase(`${address}`) && (
          <div className="px-5 text-center pt-5">
            <div className="flex items-center justify-center space-x-1 group">
              <Button
                onClick={() => setTipModal(true)}
                type={"button"}
                kind={"primary"}
                shape={"ROUNDED"}
                className="rounded-lg px-3"
                title="Tip"
              >
                <div className="flex items-center space-x-1">
                  <HandCoinsIcon height={18} />
                  <p className="text-xs">Give a Tip</p>
                </div>
              </Button>
            </div>
            <p className="text-xs text-medium mt-2">
              4 people tippped the creator.
            </p>
          </div>
        )}

      <div className="mb-3 pt-5 px-5">
        <div className="flex items-center justify-between space-x-1">
          <div className="flex items-center space-x-2">
            <p className="text-sm text-medium">
              <Moment format="hh:mm A · MMM D, YYYY">{post?.createdAt}</Moment>
            </p>
            {/* <p className="text-sm text-medium">3:39 AM · Apr 18, 2024</p> */}
            <p className="text-sm text-medium">
              <span className="font-semibold">1,191</span> Views
            </p>
          </div>
          <div className="flex items-center bg-danger/20 py-1 px-3 space-x-1 rounded-sm">
            <TrendingDownIcon size={18} className="text-danger" />
            <p className="text-danger font-semibold text-sm text-right">
              Bearish
            </p>
          </div>
        </div>
      </div>

      <div className="py-2 flex px-5 items-center justify-between border-y border-light">
        <div className="flex items-center space-x-1 group">
          <Button
            type={"button"}
            kind={"default"}
            shape={"CIRCLE"}
            className="text-dark group-hover:text-primary group-hover:bg-primary/20"
            hoverColor={false}
            title="Comments"
          >
            <MessageSquareTextIcon height={23} />
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
            <ThumbsUpIcon height={23} />
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
            title="Share"
          >
            <Share2Icon height={23} />
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
            title="Remint"
          >
            <Repeat2Icon height={23} />
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
            title="Comments"
          >
            <BookmarkIcon height={23} />
          </Button>
        </div>
      </div>
      <div>{/* <PostsComment /> */}</div>
      {post && <TipModal post={post} open={tipModal} setOpen={setTipModal} />}
    </div>
  );
}

export default PostDetails;
