"use client";

import React, { useState } from "react";
import TabsRoot from "../Tabs/TabsRoot";
import TabsHeader from "../Tabs/TabsHeader";
import TabsContent from "../Tabs/TabsContent";
import TabsList from "../Tabs/TabsList";
import Feeds from "../Home/Feeds";

function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("tab1");

  const onTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="max-w-5xl mx-auto mt-5">
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
              title="Created"
              value="tab2"
              activeTabId={activeTab}
              onTabChange={onTabChange}
            />
            <TabsHeader
              title="Collected"
              value="tab3"
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
            <Feeds />
          </TabsContent>
          <TabsContent value="tab2" activeTabId={activeTab}>
            <div>Tab 2</div>
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
