"use client";

import React from "react";
import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from "@livekit/components-react";
import { Track, ConnectionState } from "livekit-client";
import OfflineStream from "./stream-components/OfflineStream";
import LoaderStream from "./stream-components/LoaderStream";
import LiveVideo from "./stream-components/LiveVideo";

type Props = {
  hostIdentity: string;
  hostName: string;
};

function Video({ hostIdentity, hostName }: Props) {
  const connState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((t) => t.participant.identity === hostIdentity);

  let content;

  if (!participant && connState == ConnectionState.Connected) {
    content = <OfflineStream />;
  } else if (!participant || tracks.length === 0) {
    content = <LoaderStream />;
  } else {
    content = <LiveVideo participant={participant} />;
  }
  return <div>{content}</div>;
}

export default Video;
