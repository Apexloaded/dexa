import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  data: string;
  dataType?: "HTML" | "STRING";
  more?: string;
  less?: string;
  truncatedEndingComponent?: string;
  endLength?: number;
  isShowMore?: boolean;
  onClick?: () => void;
}

const highlightUsernames = (text: string) => {
  const regex = /@(\w+)/g;
  return text.replace(
    regex,
    '<span class="text-primary hover:underline"><a href="/$1" onClick="(event) => event.stopPropagation()">$&</a></span>'
  );
};

const highlightHashtags = (text: string) => {
  const regex = /#(\w+)/g;
  return text.replace(
    regex,
    '<span class="text-primary hover:underline"><a href="/hashtag/$1" onClick="(event) => event.stopPropagation()">$&</a></span>'
  );
};

const highlightSign = (text: string) => {
  const regex = /$(\w+)/g;
  return text.replace(
    regex,
    `<span class="text-primary hover:underline">
      ${(<Link href={"hashtag/$1"}>$&</Link>)}
      <a href="hashtag/$1" onClick="(event) => event.stopPropagation()">$&</a>
    </span>`
  );
};

function ShowMore({
  data,
  truncatedEndingComponent = "...",
  less = "Show less",
  more = "Show more",
  endLength = 250,
  dataType = "STRING",
  isShowMore = false,
  onClick,
}: Props) {
  const [showMore, setShowMore] = useState<boolean>(isShowMore);
  const postData = highlightHashtags(highlightUsernames(data));
  const post =
    data.length > endLength && showMore
      ? `${postData?.substring(
          0,
          endLength
        )}<span className={"text-primary"}>${truncatedEndingComponent}</span>`
      : postData;

  return (
    <>
      <div>
        {dataType === "HTML" ? (
          <>
            <div
              className="html-data"
              dangerouslySetInnerHTML={{
                __html: post,
              }}
            ></div>
          </>
        ) : (
          <span>
            {data.substring(0, endLength)}
            {data.length > endLength && (
              <span className={"text-primary"}>{truncatedEndingComponent}</span>
            )}
          </span>
        )}
        {showMore && data.length > endLength && (
          <button
            className={`text-primary font-semibold text-sm gap-1 items-center ${
              showMore ? "flex ml-0 mt-2" : "inline-flex"
            } `}
            onClick={onClick}
          >
            {showMore ? more : less}
          </button>
        )}
      </div>
    </>
  );
}

export default ShowMore;
