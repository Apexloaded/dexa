"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import ChatItem from "@/components/Messages/ChatItem";
import { useDexaMessenger } from "@/context/dexa-messenger.context";
import { useAccount, useReadContract, useWatchContractEvent } from "wagmi";
import { NextPage } from "next";
import { Status } from "@/components/Profile/ProfileHeader";
import EmptyChat from "@/components/Messages/EmptyChat";
import { useDexa } from "@/context/dexa.context";
import { UserInterface } from "@/interfaces/user.interface";
import {
  ChatInterface,
  MessageInterface,
} from "@/interfaces/message.interface";
import CreatorPFP from "@/components/Posts/ListPost/CreatorPFP";
import SendMessage from "@/components/Messages/SendMessage";
import { useMutationObserver } from "@/hooks/mutation.hook";
import useReadMessenger from "@/hooks/read.messenger.hook";

type ScrollIntoViewProps = {
  behavior: ScrollBehavior | undefined;
  block: ScrollLogicalPosition | undefined;
};

type Props = {
  params: { address: string };
};

const ReadMessage: NextPage<Props> = ({ params }) => {
  const { address } = useAccount();
  const [status, setStatus] = useState<Status>();
  const { CreatorABI, dexaCreator } = useDexa();
  const {
    MessengerABI,
    dexaMessenger,
    currentMsg,
    setCurrentMsg,
    mapChats,
    getChatCode,
  } = useDexaMessenger();
  const [userProfile, setUserProfile] = useState<UserInterface>();

  const endOfMsgRef = useRef<HTMLParagraphElement>(null);
  const elementRef = useRef(null);

  const scrollIntoView = (props: ScrollIntoViewProps) =>
    endOfMsgRef.current?.scrollIntoView(props);

  const onListMutation = useCallback(
    (mutations: MutationRecord[], observer: MutationObserver) => {
      if (mutations[mutations.length - 1].type === "attributes") {
        scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      scrollIntoView({ behavior: "auto", block: "start" });
    },
    []
  );

  useMutationObserver(elementRef.current, onListMutation);

  const { data: user } = useReadContract({
    abi: CreatorABI,
    address: dexaCreator,
    functionName: "findCreator",
    args: [`${params.address}`],
    query: {
      enabled: currentMsg ? false : true,
    },
  });

  const { data: userChats, refetch: refetchChats } = useReadMessenger({
    functionName: "readChat",
    args: [`${params.address}`],
    account: address,
  });
  // const { data: userChats, refetch: refetchChats } = useReadContract({
  //   abi: MessengerABI,
  //   address: dexaMessenger,
  //   functionName: "readChat",
  //   args: [`${params.address}`],
  //   account: address,
  // });

  const { data: isFriend } = useReadMessenger({
    functionName: "checkFriendStatus",
    args: [
      `${currentMsg ? currentMsg.profile.username : userProfile?.username}`,
    ],
    query: {
      enabled: currentMsg ? true : userProfile ? true : false,
    },
    account: address,
  });

  useWatchContractEvent({
    address: dexaMessenger,
    abi: MessengerABI,
    eventName: "ChatSent",
    onLogs(logs) {
      const { args } = logs[0] as any;
      const { chatCode, _from, _to } = args;
      const verifyChatCode = getChatCode(_from, _to);
      if (verifyChatCode.toString() === chatCode.toString()) {
        if (_from == address) return;
        refetchChats();
        // const senderAddr = getMsgAddress(from, to);
        // readMessage(address);
      }
    },
  });

  useEffect(() => {
    if (user) {
      setUserProfile(user as UserInterface);
    }
  }, [user]);

  useEffect(() => {
    if (isFriend) {
      const data = isFriend as boolean[];
      setStatus({ isRequest: data[0], isAccepted: data[1] });
    }
  }, [isFriend]);

  useEffect(() => {
    if (status?.isAccepted && userProfile) {
      const newChat: ChatInterface = {
        profile: {
          id: params.address,
          username: `${userProfile.username}`,
          name: `${userProfile.name}`,
          pfp: `${userProfile.pfp}`,
        },
        chats: !userChats ? [] : (userChats as MessageInterface[]),
      };
      const chats = mapChats(newChat);
      setCurrentMsg(chats);
      scrollToBottom();
    }
  }, [userChats, status?.isAccepted, userProfile]);

  useEffect(() => {
    scrollToBottom();
  }, [currentMsg, endOfMsgRef, status?.isAccepted, elementRef]);

  const scrollToBottom = () => {
    if (endOfMsgRef.current)
      endOfMsgRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <div>
      {status?.isAccepted ? (
        <div
          className={`w-auto flex flex-col justify-between bg-white md:bg-primary/5 h-screen`}
        >
          <header className="sticky top-0 z-10">
            <div className="flex items-center justify-between h-14 bg-white md:bg-primary/10 border-light border-b px-4">
              <div className="flex">Back</div>
              <div className="max-w-[10rem] md:max-w-xs">
                <p className="font-semibold truncate text-gray-800 dark:text-gray-400">
                  {currentMsg?.profile.name}
                </p>
              </div>
              <div className="flex items-center space-x-2 justify-between">
                <CreatorPFP
                  username={currentMsg?.profile.username}
                  name={currentMsg?.profile.name}
                  pfp={currentMsg?.profile.pfp}
                />
              </div>
            </div>
          </header>
          <section className="flex overflow-scroll scrollbar-hide px-4 flex-1">
            <div className="w-full" ref={elementRef}>
              {currentMsg?.chats
                .sort(
                  (a, b) =>
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                )
                .map((msg: MessageInterface, i: number) => (
                  <ChatItem key={i} chat={msg} />
                ))}
              <p
                ref={endOfMsgRef}
                className={`text-gray-100 transition text-sm bg-dark mb-1`}
              >
                <span className={`hidden font-thin`}></span>
              </p>
            </div>
          </section>
          <SendMessage
            endOfMsgRef={endOfMsgRef}
            setChats={setCurrentMsg}
            chats={currentMsg}
          />
        </div>
      ) : (
        <EmptyChat />
      )}
    </div>
  );
};

export default ReadMessage;
