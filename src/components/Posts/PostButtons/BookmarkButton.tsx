import React from "react";
import Button from "@/components/Form/Button";
import { Post } from "@/interfaces/feed.interface";
import { BookmarkIcon } from "lucide-react";

type Props = { post: Post };
function BookmarkButton({ post }: Props) {
  return (
    <Button
      type={"button"}
      kind={"default"}
      shape={"CIRCLE"}
      className="text-dark group-hover:text-primary group-hover:bg-primary/20"
      hoverColor={false}
      onClick={(e) => {
        e.stopPropagation();
      }}
      title="Bookmark"
    >
      <BookmarkIcon height={18} />
    </Button>
  );
}

export default BookmarkButton;
