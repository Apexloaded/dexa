"use client";

import React, { useState } from "react";
import LiveWelcome from "@/components/Live/Welcome";
import Section from "@/components/Layouts/Section";
import {
  Call,
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
} from "@stream-io/video-react-sdk";

export default function GoLive() {
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [call, setCall] = useState<Call>();

  return (
    <>
      {call ? (
        <div className="flex space-x-5">
          <Section>
            <StreamCall call={call}>
              <StreamTheme>
                <SpeakerLayout />
                <CallControls />
              </StreamTheme>
            </StreamCall>
          </Section>
        </div>
      ) : (
        <div className="overflow-scroll px-5 h-screen">
          <LiveWelcome setCall={setCall} />
        </div>
      )}
    </>
  );
}
