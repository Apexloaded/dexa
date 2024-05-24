"use client";

import { AuthData, UserInterface } from "@/interfaces/user.interface";
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
import { useAppSelector } from "./redux.hook";
import { selectAuth, setAuth } from "@/slices/account/auth.slice";
import DexaCreator from "@/contracts/DexaCreator.sol/DexaCreator.json";
import { DEXA_CREATOR } from "@/config/env";
import { toOxString } from "@/libs/helpers";
import { publicRoutes } from "@/libs/routes";
import { clearSession } from "@/actions/auth.action";

const CREATOR = toOxString(DEXA_CREATOR);

function useUser() {
  const router = useRouter();
  const path = usePathname();
  const dispatch = useDispatch();
  const isAuth = useAppSelector(selectAuth);
  const [user, setUser] = useState<UserInterface>();
  const [profileProgress, setProfileProgress] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { address, isConnected, isDisconnected, chainId, isReconnecting } =
    useAccount();
  const { chains } = useSwitchChain();
  const { disconnect } = useDisconnect();
  const { getItem, setItem } = useStorage();

  const { data } = useReadContract({
    abi: DexaCreator,
    address: CREATOR,
    functionName: "findCreator",
    args: [address],
    query: { enabled: address ? true : false },
  });

  useEffect(() => {
    if (data) {
      const user = data as any;
      const selectedFields = ["name", "username"];
      const completedFields = selectedFields.filter(
        (fieldName: any) =>
          user[fieldName] !== null &&
          user[fieldName] !== undefined &&
          user[fieldName] !== false
      ).length;
      const completetionPercentage =
        (completedFields / selectedFields.length) * 100;

      setProfileProgress(completetionPercentage);
    }
  }, [data]);

  useEffect(() => {
    const init = () => {
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
    if (!isConnected && isDisconnected && !publicRoutes.includes(path)) {
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

  const logout = () => {
    // disconnect();
    // dispatch(setAuth(false));
    // clearSession();
  };

  return {
    logout,
    user,
    profileProgress,
    setProfileProgress,
    isAuth,
  };
}

export default useUser;
