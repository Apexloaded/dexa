"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  BadgeCheckIcon,
  Banknote,
  Calendar,
  CameraIcon,
  CheckIcon,
  HandCoinsIcon,
  LinkIcon,
  MessageCircle,
  MessageSquareShare,
  PencilIcon,
  TwitterIcon,
  WalletIcon,
} from "lucide-react";
import Button from "../Form/Button";
import ShowMore from "../Posts/ShowMore";
import Link from "next/link";
import TabsHeader from "../Tabs/TabsHeader";
import TabsList from "../Tabs/TabsList";
import TabsRoot from "../Tabs/TabsRoot";
import TabsContent from "../Tabs/TabsContent";
import ProfileTabs from "./ProfileTabs";
import BackButton from "../ui/BackButton";
import { useAccount } from "wagmi";
import { formatWalletAddress } from "@/libs/helpers";

function ProfileHeader() {
  const [ismine] = useState(false);
  const { address } = useAccount();

  return (
    <>
      <div className="py-3 px-2 bg-white xl:bg-white/95 sticky z-50 top-0">
        <div className="flex items-center justify-start space-x-2">
          <BackButton />
          <div>
            <p className="text-xl font-semibold">nftly.eth</p>
            {address && (
              <p className="text-xs text-medium">
                {formatWalletAddress(address)}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="bg-white relative">
        <div className="mx-auto">
          <div className={`h-48 md:h-52 relative w-full`}>
            <div className="h-full w-full overflow-hidden bg-light">
              <img src={""} className={`w-full h-full m-0 flex`} />
              <div className="h-32 w-32 rounded-full border-4 border-white absolute -bottom-16 left-4 bg-medium"></div>
            </div>
            {/* <div className="w-28 md:inline h-28 hover:bg-gray-300 p-2 md:h-32 md:w-32 lg:h-40 lg:w-40 rounded-full bg-gray-200 mx-auto border-4 border-white absolute left-5 -bottom-20 md:left-6 md:-bottom-[6.5rem] lg:-bottom-[8.2rem]">
            <div className="w-full cursor-pointer h-full flex items-center justify-center">
              <CameraIcon size={30} className="text-black h-20 bg-gray-900 rounded-full p-5 bg-opacity-20" />
            </div>
          </div>
          <div className="flex space-x-3 justify-end bg-black w-full absolute px-5 py-2 bg-opacity-60 bottom-0">
            <button
              title="Tip"
              className="border rounded-xl border-l bg-white dark:bg-gray-200 dark:hover:bg-gray-300 hover:shadow-xl h-full p-3"
            >
              <Banknote className="h-6" />
            </button>
            <button
              title="Chat"
              className="border border-l bg-indigo-600 hover:bg-indigo-700 text-white rounded-full h-full p-3"
            >
              <MessageCircle className="h-6" />
            </button>
          </div>
          <button className="absolute bottom-36 hover:bg-white dark:hover:bg-gray-600 md:bottom-40 lg:bottom-0 bg-gray-100 dark:bg-gray-700 dark:text-white right-6 px-6 rounded-md my-4 flex space-x-1 justify-center items-center">
            <span>Edit</span>
            <PencilIcon className="h-5" />
          </button> */}
          </div>
          <div className="flex justify-end py-3 px-5 gap-x-2">
            <Button
              type="button"
              kind={"default"}
              shape={"CIRCLE"}
              className="border border-medium text-sm"
            >
              <MessageSquareShare size={18} />
            </Button>
            <Button
              type="button"
              kind={"default"}
              shape={"CIRCLE"}
              className="border border-medium text-sm"
            >
              <HandCoinsIcon size={18} />
            </Button>
            <Button
              type="button"
              kind={"primary"}
              shape={"ROUNDED"}
              className="text-sm"
            >
              Follow
            </Button>
            <Button
              type="button"
              kind={"default"}
              shape={"ROUNDED"}
              className="border border-medium hidden text-sm"
            >
              Edit profile
            </Button>
          </div>
          <div className="md:flex px-5 items-center justify-between">
            <div className="">
              <div>
                <div className="flex items-center space-x-1">
                  <div className="max-w-sm truncate">
                    <p className="font-bold text-lg">Joel Jeffery</p>
                  </div>
                  <BadgeCheckIcon
                    size={25}
                    className="fill-primary stroke-white"
                  />
                </div>
                <p className="text-primary -mt-1 text-sm font-normal truncate max-w-[10rem]">
                  @apexloaded
                </p>
              </div>
              <div className="mt-1">
                <ShowMore
                  data="Health First, building @nftly_x & @apexloaded , web 3.0
                enthusiast. Turn on 🔔 & DYOR."
                  isShowMore={true}
                  dataType="HTML"
                ></ShowMore>
              </div>
              <div className="mt-3 flex items-center gap-x-3 flex-wrap">
                <Link
                  href=""
                  target={"_blank"}
                  className="flex items-center space-x-1"
                >
                  <WalletIcon size={18} className="text-medium" />
                  <p className="text-primary text-sm">0x9773...0874</p>
                </Link>
                <Link
                  href=""
                  target={"_blank"}
                  className="flex items-center space-x-1"
                >
                  <LinkIcon size={18} className="text-medium" />
                  <p className="text-primary text-sm">techcoach.pro</p>
                </Link>
                <div className="flex items-center space-x-1">
                  <Calendar size={18} className="text-medium" />
                  <p className="text-medium text-sm">Joined Jan 20, 2022</p>
                </div>
              </div>
              <div className="flex space-x-4 items-center mt-3">
                <div className="flex items-center space-x-1">
                  <p className="font-extrabold text-sm text-dark">50</p>
                  <p className="text-medium text-sm">Following</p>
                </div>
                <div className="flex items-center space-x-1">
                  <p className="font-extrabold text-sm text-dark">14,000</p>
                  <p className="text-medium text-sm">Followers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileHeader;
