"use client";

import React from "react";
import Button from "@/components/Form/Button";
import {
  CalendarPlusIcon,
  Container,
  ImageIcon,
  ShieldQuestionIcon,
  SmilePlusIcon,
  Waypoints,
} from "lucide-react";
import { GifIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import ape1 from "@/assets/nft/1.png";

function NewContent() {
  return (
    <div className="px-5 pt-2 flex items-start space-x-3">
      <div>
        <div className="hover:bg-dark/20 cursor-pointer h-12 w-12 rounded-full absolute"></div>
        <Image
          height={100}
          width={100}
          alt=""
          className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-gray-700"
          src={ape1}
        />
      </div>
      <div className="flex-1 flex flex-col">
        <input
          placeholder="What's on your mind, Joel?"
          className="outline-none py-3 font-medium"
        />
        <div className="py-2 cursor-pointer group">
          <div className="flex items-center space-x-1">
            <Container
              size={18}
              className="text-primary group-hover:text-primary/90"
            />
            <p className="text-primary group-hover:text-primary/90 font-semibold">
              Mint off chain
            </p>
          </div>
          <div className="flex items-center space-x-1">
            <Waypoints
              size={18}
              className="text-primary group-hover:text-primary/90"
            />
            <p className="text-primary font-semibold group-hover:text-primary/90">
              Mint on chain
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-light py-2">
          <div className="flex items-center">
            <Button
              type={"button"}
              kind={"default"}
              shape={"CIRCLE"}
              className="text-primary hover:bg-primary/20"
              title="Media"
            >
              <ImageIcon size={18} />
            </Button>
            <Button
              type={"button"}
              kind={"default"}
              shape={"CIRCLE"}
              className="text-primary hover:bg-primary/20"
              title="GIF"
            >
              <GifIcon height={23} />
            </Button>
            <Button
              type={"button"}
              kind={"default"}
              shape={"CIRCLE"}
              className="text-primary hover:bg-primary/20"
              title="Emoji"
            >
              <SmilePlusIcon size={18} />
            </Button>
            <Button
              type={"button"}
              kind={"default"}
              shape={"CIRCLE"}
              className="text-primary hover:bg-primary/20"
              title="Pool"
            >
              <ShieldQuestionIcon size={18} />
            </Button>
            <Button
              type={"button"}
              kind={"default"}
              shape={"CIRCLE"}
              className="text-primary hover:bg-primary/20"
              title="Schedule"
            >
              <CalendarPlusIcon size={18} />
            </Button>
          </div>
          <div>
            <Button
              type={"button"}
              kind={"primary"}
              shape={"NORMAL"}
              className="rounded-3xl font-medium"
              disabled
            >
              Mint
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewContent;
