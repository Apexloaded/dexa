import React, { useEffect, useState } from "react";
import Moment from "react-moment";

import { FriendListInterface } from "@/interfaces/user.interface";
import { MessageInterface } from "@/interfaces/message.interface";

type Props = { contact: FriendListInterface };

const FriendList = ({ contact }: Props) => {
  const [lastMsg, setLastMsg] = useState<MessageInterface>();

  // useEffect(() => {
  //   (async () => {
  //     if (contact) {
  //       const msgs = await readMessage(contact.pubkey);
  //       const sortedMsg = msgs.sort(
  //         (a, b) => b.timestamp.valueOf() - a.timestamp.valueOf()
  //       );
  //       setLastMsg(sortedMsg[0]);
  //     }
  //   })();
  // }, [contact, currentChat, chatEvent]);

  return (
    <div className="flex justify-between space-x-2 lg:space-x-0">
      <div className="flex truncate w-full md:w-[12rem] lg:w-[18rem] items-center space-x-2">
        <div className="h-11 w-11 rounded-full flex items-center justify-center bg-primary/10 dark:bg-gray-200">
          <p className="text-xl uppercase">{contact.name.charAt(0)}</p>
        </div>
        <div className="w-auto flex-1 truncate">
          <h1 className="truncate font-semibold text-dark">{contact.pubkey}</h1>
          <p className="truncate text-sm text-medium">{lastMsg?.message}</p>
        </div>
      </div>
      <div className="w-[6rem] md:w-[4rem] text-medium flex items-center justify-end text-right">
        <div className="">
          <Moment
            format="h:mm A"
            className={`text-xs text-medium block truncate`}
          >
            {lastMsg?.timestamp}
          </Moment>
        </div>
      </div>
    </div>
  );
};

export default FriendList;
