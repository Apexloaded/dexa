import React from "react";
import Button from "@/components/Form/Button";
import { Share2Icon } from "lucide-react";
import { Post } from "@/interfaces/feed.interface";

type Props = {
  post: Post;
};

function ShareButton({ post }: Props) {
  return (
    <>
      <Button
        type={"button"}
        kind={"default"}
        shape={"CIRCLE"}
        className="text-dark group-hover:text-primary group-hover:bg-primary/20"
        hoverColor={false}
        onClick={(e) => {e.stopPropagation()}}
        title="Share"
      >
        <Share2Icon size={18} />
      </Button>
      <p className="text-sm group-hover:text-primary">12</p>
    </>
  );
}

export default ShareButton;
