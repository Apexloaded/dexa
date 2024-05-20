"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  BadgeCheckIcon,
  Banknote,
  Calendar,
  Camera,
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
import { useAccount, useReadContract } from "wagmi";
import { formatWalletAddress, getFirstLetters } from "@/libs/helpers";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/services/user.service";
import { UserInterface } from "@/interfaces/user.interface";
import Moment from "react-moment";
import { useAuth } from "@/context/auth.context";
import EditProfile from "./EditProfile";
import { useDexa } from "@/context/dexa.context";
import Image from "next/image";

type Props = {
  username: string;
};

function ProfileHeader({ username }: Props) {
  const [ismine] = useState(false);
  const [user, setUser] = useState<UserInterface>();
  const [editModal, setEditModal] = useState<boolean>(false);
  const { user: authUser } = useAuth();
  const { dexaCreator, CreatorABI } = useDexa();
  const isOwner =
    user?.wallet?.toLowerCase() == authUser?.wallet?.toLowerCase();

  const { data: response } = useReadContract({
    abi: CreatorABI,
    address: dexaCreator,
    functionName: "findCreatorByUsername",
    args: [username],
  });

  useEffect(() => {
    if (response) {
      const { createdAt, ...payload } = response as UserInterface;
      const date = new Date(Number(createdAt) * 1000).toISOString();
      setUser({ ...payload, createdAt: date });
    }
  }, [response]);

  return (
    <>
      <div className="py-3 px-2 bg-white xl:bg-white/95 sticky z-50 top-0">
        <div className="flex items-center justify-start space-x-2">
          <BackButton />
          <div>
            <p className="text-xl font-semibold">{user?.name}</p>
            {user && user.wallet && (
              <p className="text-xs text-medium">
                {formatWalletAddress(user.wallet)}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="bg-white relative">
        <div className="mx-auto">
          <div className={`h-48 md:h-52 relative w-full`}>
            <div className="h-full w-full overflow-hidden bg-light">
              {user?.banner ? (
                <Image
                  src={user.banner}
                  height={2500}
                  width={3000}
                  alt={"Banner"}
                  className={`w-full h-full m-0 flex`}
                />
              ) : (
                <>
                  <img
                    src={"/banner/bg.png"}
                    className={`w-full h-full m-0 flex`}
                  />
                  <div className="h-full w-full absolute bg-white/10 inset-0"></div>
                </>
              )}
              <div className="h-32 w-32 overflow-hidden rounded-full hover:bg-medium/25 hover:cursor-pointer flex items-center justify-center border-4 border-white absolute -bottom-16 left-4 bg-medium/20">
                {user?.pfp ? (
                  <Image
                    src={user.pfp}
                    height={400}
                    width={400}
                    alt={"PFP"}
                    className=""
                  />
                ) : isOwner ? (
                  <div
                    role="button"
                    onClick={() => setEditModal(true)}
                    className="h-14 w-14 cursor-pointer bg-white/90 border border-primary rounded-full flex justify-center items-center"
                  >
                    <Camera className="text-primary" />
                  </div>
                ) : (
                  <div className="h-14 w-14 bg-white/90 border border-primary rounded-full flex justify-center items-center">
                    <p className="text-2xl font-semibold text-primary">
                      {getFirstLetters(`${user?.name}`)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {isOwner ? (
            <div className="flex justify-end py-3 px-5 gap-x-2">
              <Button
                type="button"
                kind={"default"}
                shape={"ROUNDED"}
                onClick={() => setEditModal(true)}
                className="border border-medium text-sm"
              >
                Edit profile
              </Button>
            </div>
          ) : (
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
            </div>
          )}
          <div className="md:flex px-5 items-center justify-between">
            <div className="">
              <div>
                <div className="flex items-center space-x-1">
                  <div className="max-w-sm truncate">
                    <p className="font-bold text-lg">{user?.name}</p>
                  </div>
                  <BadgeCheckIcon
                    size={25}
                    className="fill-primary stroke-white"
                  />
                </div>
                <p className="text-primary -mt-1 text-sm font-normal truncate max-w-[10rem]">
                  @{user?.username}
                </p>
              </div>
              {user?.bio && (
                <div className="mt-1">
                  <ShowMore data={user.bio} isShowMore={true}></ShowMore>
                </div>
              )}

              <div className="mt-3 flex items-center gap-x-3 flex-wrap">
                {user && user.wallet && (
                  <Link
                    href=""
                    target={"_blank"}
                    className="flex items-center space-x-1"
                  >
                    <WalletIcon size={18} className="text-medium" />
                    <p className="text-primary text-sm">
                      {formatWalletAddress(user.wallet)}
                    </p>
                  </Link>
                )}
                {user?.website && (
                  <Link
                    href={user.website}
                    target={"_blank"}
                    className="flex items-center space-x-1"
                  >
                    <LinkIcon size={18} className="text-medium" />
                    <p className="text-primary text-sm">{user.website}</p>
                  </Link>
                )}

                <div className="flex items-center space-x-1">
                  <Calendar size={18} className="text-medium" />
                  <p className="text-medium text-sm">
                    Joined{" "}
                    <Moment format="MMM D, YYYY">{user?.createdAt}</Moment>
                  </p>
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
      {user && isOwner && (
        <EditProfile user={user} isOpen={editModal} setIsOpen={setEditModal} />
      )}
    </>
  );
}

export default ProfileHeader;
