"use client";

import React, { SetStateAction, useState } from "react";
import { useDexaMessenger } from "@/context/dexa-messenger.context";
import {
  ChatInterface,
  MessageInterface,
} from "@/interfaces/message.interface";
import { useAccount, useWriteContract } from "wagmi";
import Button from "../Form/Button";
import { PaperclipIcon, SendHorizonalIcon, SmilePlusIcon } from "lucide-react";
import CLEditor from "../Editor/Editor";

type Props = {
  endOfMsgRef: React.RefObject<HTMLParagraphElement>;
  setChats: React.Dispatch<SetStateAction<ChatInterface | undefined>>;
  chats: ChatInterface | undefined;
};

const SendMessage = ({ endOfMsgRef, setChats, chats }: Props) => {
  const { address } = useAccount();
  const [msg, setMsg] = useState<string>();
  const { currentMsg, setCurrentMsg, dexaMessenger, MessengerABI } =
    useDexaMessenger();
  const { writeContractAsync } = useWriteContract();

  const scrollToBottom = (prop: any) => {
    if (endOfMsgRef.current) endOfMsgRef.current.scrollIntoView(prop);
  };

  const initSendMessage = async () => {
    if (!msg || !address || !currentMsg) return;
    await writeContractAsync({
      abi: MessengerABI,
      address: dexaMessenger,
      functionName: "sendMessage",
      args: [`${currentMsg?.profile.id}`, msg, []],
    });
    const chat: MessageInterface = {
      sender: address,
      message: msg,
      media: [],
      createdAt: new Date().toISOString(),
    };
    setCurrentMsg({
      profile: currentMsg.profile,
      chats: [...currentMsg.chats, chat],
    });
    // setChats([...chats, chat]);
    setMsg("");
    scrollToBottom({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <form>
        <footer className="min-h-[5rem] max-h-20 bg-white md:bg-primary/10 border-light dark:bg-gray-800 border-t dark:border-gray-600 flex space-x-2 items-center px-4">
          <div className="rounded-3xl flex-1 overflow-hidden dark:bg-gray-900 flex bg-white">
            <Button type={"button"} kind={"clear"}>
              <SmilePlusIcon size={14} />
            </Button>
            <textarea
              onChange={(e) => setMsg(e.currentTarget.value)}
              className="w-full outline-none h-12 bg-transparent py-3 text-medium"
              placeholder="Type a message..."
              value={msg}
            ></textarea>
            <Button type={"button"} kind={"clear"}>
              <PaperclipIcon size={14} />
            </Button>
          </div>
          <Button
            type={"button"}
            kind={"primary"}
            shape={"CIRCLE"}
            onClick={initSendMessage}
          >
            <SendHorizonalIcon size={14} />
          </Button>
        </footer>
      </form>
    </>
  );
};

export default SendMessage;
