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
import Button from "../../Form/Button";
import ShowMore from "../ShowMore";
import usePost from "@/hooks/post.hook";
import { Post } from "@/interfaces/feed.interface";
import Moment from "react-moment";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/redux.hook";
import { selectPost } from "@/slices/posts/post-selected.slice";
import {
  formatWalletAddress,
  getFirstLetters,
  timestampToDate,
  weiToUnit,
} from "@/libs/helpers";
import { Diamond } from "../../Icons/Others";
import BlueCheckMark from "../../Profile/BlueCheck";
import TipModal from "../TipModal";
import CreatorPFP from "./CreatorPFP";
import CreatorName from "./CreatorName";

type Props = {
  post: Post;
  setTipModal: (value: React.SetStateAction<boolean>) => void;
  setRemintModal: (value: React.SetStateAction<boolean>) => void;
};

function MintedPost({ post, setTipModal, setRemintModal }: Props) {
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

  const prevent = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  return (
    <>
      <div
        onClick={postDetails}
        className="hover:bg-light cursor-pointer px-5 pb-2 pt-5"
      >
        <div className="flex items-start space-x-3">
          <div className="min-w-[2.5rem] sticky top-0 flex flex-col gap-3 items-center">
            <CreatorPFP
              username={post.creator.username}
              name={post.creator.name}
              pfp={post.creator.pfp}
            />
            {Number(post.remintPrice) > 0 && (
              <div className="flex flex-col items-center">
                <Button
                  onClick={() => setRemintModal(true)}
                  type={"button"}
                  kind={"primary"}
                  shape={"CIRCLE"}
                  title="Tip"
                >
                  <Diamond />
                </Button>
                {post.remintedBy && post.remintedBy.length > 0 && (
                  <p className="text-primary text-sm">
                    {post.remintedBy.length}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex-1">
            <CreatorName
              name={post.creator.name}
              username={post.creator.username}
              createdAt={post.createdAt}
            />
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
                      priority
                    />
                  </div>
                ))}
            </Link>

            <div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">
                    Mint ID{" "}
                    <span className="text-primary">{post.tokenId}</span>
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
                  onClick={(e) => {
                    prevent(e);
                    setTipModal(true);
                  }}
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
    </>
  );
}

export default MintedPost;
