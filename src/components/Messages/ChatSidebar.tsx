"use client";

import { FriendListInterface } from "@/interfaces/user.interface";
import {
  EllipsisVerticalIcon,
  MessageSquareMoreIcon,
  PlusIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import FriendList from "./FriendList";

const friendLists: FriendListInterface[] = [
  {
    name: "James Harden",
    pubkey: "0x3943B432C4161D92fc3e511EC653d0b0e712C58F",
  },
];

function ChatSidebar() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const newContact = () => {};

  return (
    <div className="w-full md:w-4/5 lg:w-[20rem] xl:w-[25rem] border-r border-light relative">
      <div className="overflow-y-scroll h-screen">
        <header className="sticky top-0">
          <div className="flex items-center justify-between h-14 bg-primary/40 px-4">
            <div className="flex space-x-2">
              <p className="text-xl font-semibold">Messages</p>
            </div>
            <div className="flex items-center space-x-2 justify-between">
              <button className="h-10 w-10 rounded-full hover:bg-light/80 flex items-center justify-center">
                <MessageSquareMoreIcon
                  size={18}
                  className="h-6 w-6 dark:text-gray-200"
                />
              </button>
              <button className="h-10 w-10 rounded-full hover:bg-light/80 flex items-center justify-center">
                <EllipsisVerticalIcon
                  size={18}
                  className="h-6 w-6 dark:text-gray-200"
                />
              </button>
            </div>
          </div>
          <div className="px-4 bg-primary/20 h-14 flex items-center">
            <input
              type="search"
              name=""
              placeholder="search messages"
              className="w-full outline-none px-3 rounded-md h-10"
            />
          </div>
        </header>
        <section className="overflow-y-scroll">
          {friendLists && friendLists.length > 0 ? (
            <>
              {friendLists.map((contact, index) => (
                <div
                  key={index}
                  //   onClick={() => showChat(contact)}
                  className={`hover:cursor-pointer border-b border-light hover:bg-primary/5 py-2 px-4`}
                >
                  <FriendList contact={contact} />
                </div>
              ))}
            </>
          ) : (
            <div className="py-2 px-5 text-center">
              <h1 className="font-normal text-lg">No Connect</h1>
              <p className="font-normal text-medium text-sm">
                You do not have any connect yet, send someone a message now.
              </p>
            </div>
          )}
        </section>
        <div className="absolute bottom-5 right-5">
          <button
            onClick={newContact}
            className="w-14 flex items-center justify-center h-14 bg-gradient-to-r from-primary via-primary to-primary/60 text-white rounded-full"
          >
            <PlusIcon size={18} className="h-10 w-10" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatSidebar;
