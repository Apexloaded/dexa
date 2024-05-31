"use client";

import React, { useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux.hook";
import { setSidebar } from "@/slices/sidebar/sidebar.slice";
import { useStream } from "@/context/stream.context";
import { useAuth } from "@/context/auth.context";
import StreamPlayer from "@/components/Live/StreamPlayer";


function StreamVideo() {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { getViewerToken, viewerCredentials } = useStream();

  useEffect(() => {
    dispatch(setSidebar(false));
  }, []);

  useEffect(() => {
    if (user) {
      getViewerToken(`${user.wallet}`, `${user.username}`);
    }
  }, [user]);

  return (
    <>
      <StreamPlayer
        token={viewerCredentials?.token}
        hostIdentity={`${user?.wallet}`}
        hostName={`${user?.username}`}
        isStreaming={true}
      />
    </>
  );
}

export default StreamVideo;
