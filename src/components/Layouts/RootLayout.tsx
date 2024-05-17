"use client";

import React from "react";
import Sidebar from "../Menus/Sidebar";
import MobileMenu from "../Menus/MobileMenu";

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-7xl mx-auto bg-white">
      <div className="flex h-screen overflow-hidden relative overscroll-contain">
        <div className="hidden xs:inline md:w-1/5">
          <Sidebar />
        </div>
        <div className="flex-1 w-4/5">{children}</div>
        <MobileMenu />
      </div>
    </div>
  );
}

export default RootLayout;
