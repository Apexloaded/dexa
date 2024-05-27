"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../Menus/Sidebar";
import MobileMenu from "../Menus/MobileMenu";
import { useAuth } from "@/context/auth.context";
import { useAccount } from "wagmi";
import WalletConnectModal from "../Auth/WalletConnectModal";
import SignInModal from "../Auth/Login/Signature";

function AuthMainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [signModal, setSignModal] = useState<boolean>(false);
  const { isConnected, address } = useAccount();
  const { isAuth, user, isAuthenticated } = useAuth();

  useEffect(() => {
    async function fetchNonce() {
      if (isConnected && address) {
        setSignModal(true);
      }
    }
    fetchNonce();
  }, [isConnected, address]);

  return isConnected && isAuthenticated() ? (
    <div className="max-w-7xl mx-auto bg-white">
      <div className="flex flex-col justify-between xs:justify-start xs:flex-row h-svh overflow-hidden relative overscroll-contain">
        <div className="hidden xs:inline md:w-1/5">
          <Sidebar />
        </div>
        <div className="flex-1 w-full lg:w-4/5 overflow-hidden">{children}</div>
        <MobileMenu />
      </div>
    </div>
  ) : (
    <div>
      {isConnected && signModal ? (
        <SignInModal setModal={setSignModal} />
      ) : (
        <WalletConnectModal setModal={setSignModal} />
      )}
    </div>
  );
}

export default AuthMainLayout;
