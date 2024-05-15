"use client";

import { getAuthProgress, logUserOut } from "@/actions/auth.action";
import { useIndexDB } from "@/context/indexDB.context";
import { UserInterface } from "@/interfaces/user.interface";
import { setSwitchChain } from "@/slices/account/switch-chain.slice";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAccount, useDisconnect, useSwitchChain } from "wagmi";
import { Stores } from "./indexDB.hook";
import useStorage from "./storage.hook";
import { StorageTypes } from "@/libs/enum";
import { useAppSelector } from "./redux.hook";
import { selectAuth } from "@/slices/account/auth.slice";

function useUser() {
  const router = useRouter();
  const path = usePathname();
  const dispatch = useDispatch();
  const isAuth = useAppSelector(selectAuth);
  const [ens, setEns] = useState<string>();
  const [user, setUser] = useState<UserInterface>();
  const [progress, setProgress] = useState<number>();
  const { address, isConnected, isDisconnected, chainId } = useAccount();
  const { chains, switchChain } = useSwitchChain();
  const { disconnectAsync } = useDisconnect();
  const { getItem } = useStorage();

  useEffect(() => {
    const init = () => {
      const user = getItem(StorageTypes.AUTH_USER);
      setUser(user);
    };
    init();
  }, [isConnected, isAuth]);

  const { data: progressRes } = useQuery({
    queryKey: [address, "progress"],
    queryFn: () => getAuthProgress(),
    enabled: isConnected,
  });

  useEffect(() => {
    if (progressRes && progressRes.code == 200 && progressRes.data) {
      const progress = Number(progressRes.data.progress);
      setProgress(progress);
    }
  }, [progressRes]);

  useEffect(() => {
    if (!isConnected && isDisconnected && path != "/login") {
      logout();
    }
  }, [isConnected, isDisconnected]);

  useEffect(() => {
    const checkChain = () => {
      const isChain = chains.find((c) => c.id == chainId);
      if (!isChain && isConnected) {
        dispatch(setSwitchChain(true));
      } else {
        dispatch(setSwitchChain(false));
      }
    };
    checkChain();
  }, [chainId, chains, isConnected]);

  const logout = async () => {
    await disconnectAsync();
    await logUserOut();
    window.location.reload();
  };

  return { ens, progress, logout, user };
}

export default useUser;
