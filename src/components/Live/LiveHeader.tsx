import React from "react";
import { useAuth } from "@/context/auth.context";
import CreatorPFP from "../Posts/ListPost/CreatorPFP";
import Header from "../ui/Header";

type Props = {
  title: string;
};

function LiveHeader({ title }: Props) {
  const { user } = useAuth();
  return (
    <div className="border-b border-light flex items-center justify-between">
      <Header title={title} />
      <div className="pr-5">
        <CreatorPFP
          username={user?.username}
          name={user?.name}
          pfp={user?.pfp}
        />
      </div>
    </div>
  );
}

export default LiveHeader;
