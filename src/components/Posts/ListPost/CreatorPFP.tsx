import Link from "next/link";
import Image from "next/image";
import React from "react";
import { getFirstLetters } from "@/libs/helpers";

type Props = {
  pfp?: string;
  username?: string;
  name?: string;
  className?: string;
};
function CreatorPFP({ pfp, username, name, className }: Props) {
  const prevent = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };
  return (
    <Link href={`/${username}`} className="">
      <div className="w-10">
        <div className="hover:bg-dark/20 cursor-pointer h-10 w-10 rounded-full absolute"></div>
        {pfp ? (
          <Image
            src={pfp}
            height={400}
            width={400}
            alt={"PFP"}
            className="h-10 w-10 rounded-full"
          />
        ) : (
          <div className="h-10 w-10 bg-white/90 border border-primary rounded-full flex justify-center items-center">
            <p className="text-base font-semibold text-primary">
              {getFirstLetters(`${name}`)}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}

export default CreatorPFP;
