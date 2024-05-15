"use client";

import React from "react";
import Button from "@/components/Form/Button";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import Lottie from "lottie-react";
import dbAnim from "@/assets/lottie/live.json";
import evAnim from "@/assets/lottie/event.json";
import Section from "@/components/Layouts/Section";

type Props = {
  setCall: React.Dispatch<React.SetStateAction<Call | undefined>>;
};

function LiveWelcome({ setCall }: Props) {
  const client = useStreamVideoClient();

  const startStream = async () => {
    const id = crypto.randomUUID();
    const call = client?.call("livestream", id);
    call?.join({ create: true });
    setCall(call);
  };

  return (
    <div className="pt-20">
      <div className="max-w-3xl mx-auto">
        <div>
          <p className="text-3xl text-center font-semibold">
            Go live on dexa anytime, from anywhere.
          </p>
          <p className="text-medium/50 text-center">
            Reach your audience in real time from any device
          </p>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 mt-10 gap-10">
          <div className="bg-light rounded-xl p-10 pb-20">
            <div className="pt-5 pb-10 flex justify-center">
              <Lottie animationData={evAnim} className="h-40 w-40" />
            </div>
            <div className="text-center">
              <p className="text-2xl">Schedule an event</p>
              <p className="text-medium mt-2">
                Promote your event before you go live to get maximum exposure
              </p>
            </div>
            <div className="flex gap-5 mt-6 justify-center shrink-0">
              <Button type={"button"} kind={"primary"} shape={"ROUNDED"}>
                Schedule Event
              </Button>
            </div>
          </div>
          <div className="bg-light rounded-xl p-10 pb-20">
            <div className="pt-5 pb-10 flex justify-center">
              <Lottie animationData={dbAnim} className="h-40 w-40" />
            </div>
            <div className="text-center">
              <p className="text-2xl">Go live now</p>
              <p className="text-medium mt-2">
                Start a live stream right away from your mobile device or laptop
              </p>
            </div>
            <div className="flex gap-5 mt-6 justify-center shrink-0">
              <Button
                type={"button"}
                kind={"primary"}
                shape={"ROUNDED"}
                className="flex-1"
              >
                Mobile
              </Button>
              <Button
                type={"button"}
                kind={"primary"}
                shape={"ROUNDED"}
                className="flex-1"
                onClick={startStream}
              >
                Desktop
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveWelcome;
