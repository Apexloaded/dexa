"use client";

import React, { useEffect } from "react";
import { LiveKitRoom } from "@livekit/components-react";
import { STREAM_WS } from "@/config/env";
import Video from "./Video";
import { walletToLowercase } from "@/libs/helpers";

type Props = {
  token: string;
  hostIdentity: string;
  hostName: string;
};

function StreamPlayer({ token, hostIdentity, hostName }: Props) {
  useEffect(() => {
    console.log(token);
    console.log(STREAM_WS);
  }, [token, STREAM_WS]);
  return (
    <>
      <LiveKitRoom
        token={token}
        serverUrl={STREAM_WS}
        className="h-full w-full"
      >
        <Video
          hostIdentity={walletToLowercase(hostIdentity)}
          hostName={hostName}
        />
      </LiveKitRoom>
    </>
  );
}

export default StreamPlayer;
