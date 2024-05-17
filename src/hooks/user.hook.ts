"use client";

import { UserInterface } from "@/interfaces/user.interface";
import { setSwitchChain } from "@/slices/account/switch-chain.slice";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useAccount,
  useDisconnect,
  useReadContract,
  useSwitchChain,
} from "wagmi";
import useStorage from "./storage.hook";
import { StorageTypes } from "@/libs/enum";
import { useAppSelector } from "./redux.hook";
import { selectAuth } from "@/slices/account/auth.slice";
import { logUserOut } from "@/services/auth.service";
import DexaCreator from "@/contracts/DexaCreator.sol/DexaCreator.json";
import { DEXA_CREATOR } from "@/config/env";
import { toOxString } from "@/libs/helpers";

const CREATOR = toOxString(DEXA_CREATOR);

function useUser() {
  const router = useRouter();
  const path = usePathname();
  const dispatch = useDispatch();
  const isAuth = useAppSelector(selectAuth);
  const [ens, setEns] = useState<string>();
  const [user, setUser] = useState<UserInterface>();
  const { address, isConnected, isDisconnected, chainId } = useAccount();
  const { chains, switchChain } = useSwitchChain();
  const { disconnectAsync } = useDisconnect();
  const { getItem } = useStorage();
  const { data } = useReadContract({
    abi: DexaCreator,
    address: CREATOR,
    functionName: "findCreator",
    args: [address],
  });

  useEffect(() => {
    const init = () => {
      console.log(data);
      if (data) {
        setUser({
          id: `${address}`,
          ...data,
        });
      }
    };
    init();
  }, [isConnected, isAuth, data]);

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

  return { ens, logout, user };
}

export default useUser;
