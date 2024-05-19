"use client";

import React, { useState, useEffect } from "react";
import TabsRoot from "../Tabs/TabsRoot";
import TabsHeader from "../Tabs/TabsHeader";
import TabsContent from "../Tabs/TabsContent";
import TabsList from "../Tabs/TabsList";
import UserFeeds from "./UserFeeds";
import { Post } from "@/interfaces/feed.interface";
import { useDexa } from "@/context/dexa.context";
import { useReadContract } from "wagmi";
import { sortPostByDate } from "../Home/Feeds";
import Reminted from "./Reminted";

type Props = {
  username: string;
};

function ProfileTabs({ username }: Props) {
  const [activeTab, setActiveTab] = useState("tab1");
  const [posts, setPosts] = useState<Post[]>([]);
  const { FeedsABI, dexaFeeds } = useDexa();
  const { data: response } = useReadContract({
    abi: FeedsABI,
    address: dexaFeeds,
    functionName: "postByCreator",
    args: [username],
  });

  useEffect(() => {
    if (response) {
      const _posts = response as Post[];
      const sortedPost = sortPostByDate(_posts);
      setPosts(sortedPost);
    }
  }, [response]);

  const onTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="max-w-5xl w-full mx-auto mt-5">
      <div className="overflow-scroll scrollbar-hide">
        <TabsRoot>
          <TabsList className="border-b border-light">
            <TabsHeader
              title="Collectibles"
              value="tab1"
              activeTabId={activeTab}
              onTabChange={onTabChange}
            />
            <TabsHeader
              title="Reminted"
              value="tab2"
              activeTabId={activeTab}
              onTabChange={onTabChange}
            />
            <TabsHeader
              title="Community"
              value="tab3"
              activeTabId={activeTab}
              onTabChange={onTabChange}
            />
            <TabsHeader
              title="Tips"
              value="tab4"
              activeTabId={activeTab}
              onTabChange={onTabChange}
            />
            {/*
            <TabsHeader
              title="Favourite"
              value="tab4"
              activeTabId={activeTab}
              onTabChange={onTabChange}
            />
            <TabsHeader
              title="Activity"
              value="tab5"
              activeTabId={activeTab}
              onTabChange={onTabChange}
            /> */}
          </TabsList>
          <TabsContent value="tab1" activeTabId={activeTab}>
            <UserFeeds posts={posts} />
          </TabsContent>
          <TabsContent value="tab2" activeTabId={activeTab}>
            <Reminted posts={posts} username={username} />
          </TabsContent>
          {/* <TabsContent value="tab3" activeTabId={activeTab}>
            <div>Tab 3</div>
          </TabsContent>
          <TabsContent value="tab4" activeTabId={activeTab}>
            <div>Tab 4</div>
          </TabsContent>
          <TabsContent value="tab5" activeTabId={activeTab}>
            <div>Tab 5</div>
          </TabsContent> */}
        </TabsRoot>
      </div>
    </div>
  );
}

export default ProfileTabs;
