"use client";

import { useState, useEffect } from "react";
import {
  getStreamCredentials,
  getViewerStreamCredentials,
} from "@/actions/stream.action";
import { useAuth } from "@/context/auth.context";
import {
  IStreamCredentials,
  IStreamViewerCredentials,
} from "@/interfaces/stream.interface";
import { QueryKeys } from "@/libs/enum";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode, JwtPayload } from "jwt-decode";

function useStream() {
  const [streamCredentials, setStreamCredentials] =
    useState<IStreamCredentials>();
  const [viewerCredentials, setViewerCredientials] =
    useState<IStreamViewerCredentials>();
  const { user } = useAuth();
  const { data } = useQuery({
    queryKey: [QueryKeys.STREAM_AUTH],
    queryFn: getStreamCredentials,
    enabled: user ? true : false,
  });

  useEffect(() => {
    if (data) {
      const { serverUrl, streamKey, ingressId } =
        data.data as IStreamCredentials;
      setStreamCredentials({ serverUrl, streamKey, ingressId });
    }
  }, [data]);

  const getViewerToken = async (hostIdentity: string) => {
    try {
      if (!user) return;
      const response = await getViewerStreamCredentials(
        hostIdentity,
        `${user.username}`
      );
      const token = response.data.token;
      const decoded = jwtDecode(token) as JwtPayload & { name?: string };
      console.log(decoded);
      const { name, sub } = decoded;
      if (name && sub && token) {
        setViewerCredientials({ name, token, identity: sub });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { streamCredentials, viewerCredentials, getViewerToken };
}
export default useStream;
