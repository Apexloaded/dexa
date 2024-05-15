"use client";

import { useEffect, useState } from "react";
import {
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { useAuth } from "./auth.context";
import { STREAM_KEY } from "@/config/env";
import { getStreamToken } from "@/actions/stream.action";
import { useAccount } from "wagmi";

export type IndexDBContextType = {};

interface Props {
  children: React.ReactNode;
}

export function StreamProvider({ children }: Props) {
  const { isConnected } = useAccount();
  const { user } = useAuth();
  const [client, setClient] = useState<StreamVideoClient>();

  useEffect(() => {
    const initClient = async () => {
      if (!user || !isConnected) return;
      let streamUser: User;
      streamUser = {
        id: user.address,
        name: user.name,
        image: "https://getstream.io/random_svg/?id=oliver&name=Oliver",
      };
      const token = await getStreamToken(user.address);
      if (!token) return;
      const cl = new StreamVideoClient({
        apiKey: STREAM_KEY!,
        user: streamUser,
        token: token,
      });
      setClient(cl);
    };
    initClient();
  }, [user, isConnected]);

  if (!client) return <>{children}</>;

  return <StreamVideo client={client}>{children}</StreamVideo>;
}
