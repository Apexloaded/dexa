import Link from "next/link";
import Image from "next/image";
import React, { useEffect } from "react";
import { getFirstLetters } from "@/libs/helpers";
import { useRouter } from "next/navigation";

type Props = {
  pfp?: string;
  username?: string;
  name?: string;
  className?: string;
  isClickable?: boolean;
};
function CreatorPFP({ pfp, username, name, isClickable = true, className }: Props) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(`/${username}`);
  }, [username]);

  const profile = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    router.push(`/${username}`);
  };

  return (
    <div role="button" onClick={profile} className="w-10">
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
  );
}

export default CreatorPFP;
