"use client";

import React, { useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux.hook";
import { setSidebar } from "@/slices/sidebar/sidebar.slice";
import Header from "@/components/ui/Header";
import Section from "@/components/Layouts/Section";
import Aside from "@/components/Layouts/Aside";
import LiveHeader from "@/components/Live/LiveHeader";
import useStream from "@/hooks/stream.hook";
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
      getViewerToken(`${user.wallet}`);
    }
  }, [user]);

  useEffect(() => {
    console.log(viewerCredentials);
  }, [viewerCredentials]);

  return (
    <div className="">
      <LiveHeader title="Live streaming" />
      <div className="flex">
        <Section>
          <div className="">
            {viewerCredentials ? (
              // <div className="bg-dark px-10 md:px-20 min-h-[34rem] w-full flex items-center justify-center">
              //   <div className="text-white text-center">
              //     <div>
              //       <div className="border-dark mx-auto h-14 w-14 animate-spin rounded-full border-4 border-t-medium mb-10" />
              //     </div>
              //     <p className="py-2">Connect streaming software to go live</p>
              //     <p className="py-2">
              //       Viewers will be able to find your stream once you go live on
              //       Dexa
              //     </p>
              //     <p className="py-2 text-primary font-semibold bg-white mt-4">
              //       DO YOU NEED HELP?
              //     </p>
              //   </div>
              // </div>
              <StreamPlayer
                token={viewerCredentials.token}
                hostIdentity={`${user?.wallet}`}
                hostName={`${user?.username}`}
              />
            ) : (
              // <StreamPlayer token={viewerCredentials.token} />
              <div>Cannot watch stream</div>
            )}
          </div>
        </Section>
        <Aside>
          <div>Here</div>
        </Aside>
      </div>
    </div>
  );
}

export default StreamVideo;
