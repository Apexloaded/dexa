import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getFirstLetters, walletToLowercase } from "@/libs/helpers";
import { useRouter } from "next/navigation";
import { routes } from "@/libs/routes";
import { UserInterface } from "@/interfaces/user.interface";
import { useReadContract } from "wagmi";
import { findCreatorABI } from "@/contracts/DexaCreator.sol/findCreator";
import { DEXA_CREATOR } from "@/config/env";
import { toOxString } from "@/libs/helpers";
import { getUserStreamStatus } from "@/actions/stream.action";

type Props = {
  pfp?: string;
  username?: string;
  name?: string;
  className?: string;
  isClickable?: boolean;
};
function CreatorPFP({
  pfp,
  username,
  name,
  isClickable = true,
  className,
}: Props) {
  const router = useRouter();
  const [isLive, setIsLive] = useState<boolean>(false);
  const [user, setUser] = useState<UserInterface>();
  const { data } = useReadContract({
    abi: findCreatorABI,
    address: toOxString(DEXA_CREATOR),
    functionName: "findCreatorByUsername",
    args: [username],
    query: {
      enabled: username ? true : false,
    },
  });

  useEffect(() => {
    const checkStatus = async () => {
      const user = data as UserInterface;
      const response = await getUserStreamStatus(`${user.wallet}`);
      setIsLive(response.data.status);
      setUser(user);
    };
    if (data) checkStatus();
  }, [data]);

  useEffect(() => {
    router.prefetch(routes.app.profile(`${username}`));
  }, [username]);

  const profile = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    router.push(routes.app.profile(`${username}`));
  };

  const liveStream = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const wallet = walletToLowercase(`${user?.wallet}`);
    router.push(routes.app.watch(`${wallet}`));
  };
  // https://sparrow-safe-crappie.ngrok-free.app/stream/webhook/livekit
  return (
    <div role="button" onClick={profile} className="w-10 relative">
      <div className="hover:bg-dark/20 cursor-pointer h-10 w-10 rounded-full absolute"></div>
      {isLive && (
        <div
          role="button"
          onClick={liveStream}
          className="h-10 w-10 border-[3px] z-10 flex items-end justify-center border-primary rounded-full absolute"
        >
          <p className="text-[0.5rem] rounded-sm bg-primary text-white px-1 absolute -bottom-1">
            LIVE
          </p>
        </div>
      )}

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
