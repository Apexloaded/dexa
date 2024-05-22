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
import { StorageTypes } from "@/libs/enum";
import { useAppSelector } from "./redux.hook";
import { selectAuth, setAuth } from "@/slices/account/auth.slice";
import DexaCreator from "@/contracts/DexaCreator.sol/DexaCreator.json";
import { DEXA_CREATOR } from "@/config/env";
import { toOxString } from "@/libs/helpers";
import { publicRoutes } from "@/libs/routes";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

const CREATOR = toOxString(DEXA_CREATOR);

function useUser() {
  const router = useRouter();
  const path = usePathname();
  const dispatch = useDispatch();
  const isAuth = useAppSelector(selectAuth);
  const [user, setUser] = useState<UserInterface>();
  const [profileProgress, setProfileProgress] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cookies, setCookie, removeCookie] = useCookies([
    StorageTypes.ACCESS_TOKEN,
  ]);
  const { address, isConnected, isDisconnected, chainId, isReconnecting } =
    useAccount();
  const { chains } = useSwitchChain();
  const { disconnectAsync } = useDisconnect();
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
    verifyAuth();
  }, [cookies]);

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
    if (
      !isConnected &&
      isDisconnected &&
      !publicRoutes.includes(path) &&
      !isLoading
    ) {
      logout();
      console.log("logout here");
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

  const setSession = (payload: AuthData) => {
    const { token, expiresIn } = payload;
    setCookie(StorageTypes.ACCESS_TOKEN, token, {
      maxAge: expiresIn,
      httpOnly: process.env.NODE_ENV !== "development",
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
  };

  const verifyAuth = () => {
    const authToken = cookies[StorageTypes.ACCESS_TOKEN];
    const decoded = authToken ? jwtDecode(authToken) : ("" as any);
    let currentDate = new Date();
    if (
      decoded.exp * 1000 < currentDate.getTime() ||
      decoded == "" ||
      !decoded
    ) {
      logout();
    } else {
      dispatch(setAuth(true));
    }
    setIsLoading(false);
  };

  const logout = async () => {
    await disconnectAsync();
    removeCookie(StorageTypes.ACCESS_TOKEN);
    dispatch(setAuth(false));
    if (!publicRoutes.includes(path)) {
      router.replace("/login");
    }
  };

  return {
    logout,
    user,
    profileProgress,
    setProfileProgress,
    setSession,
    isAuth
  };
}

export default useUser;
