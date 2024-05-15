"use server";

import { SiweMessage } from "siwe";
import { getApi, postApi } from "./api.action";
import { createSession, deleteSession, encrypt } from "@/libs/session";
import { AuthData, OnBoardComplete } from "@/interfaces/user.interface";
import { StorageTypes } from "@/libs/enum";
import { RedirectType, redirect } from "next/navigation";
import { ErrorResponse } from "@/interfaces/response.interface";
import { UsersService } from "@/services/user.service";
import { walletToLowercase } from "@/libs/helpers";

export const getNonce = async (wallet: `0x${string}`) => {
  const userService = new UsersService();
  const user = await userService.findOne({ wallet: walletToLowercase(wallet) });
  const nonceRes = await getApi(`auth/nonce/generate?wallet=${wallet}`);
  return nonceRes.data;
};

export const verifyNonce = async (
  message: string,
  signature: string
): Promise<any> => {
  const siwe = new SiweMessage(JSON.parse(message));
  const payload = {
    message: siwe,
    signature: signature,
  };
  const response = await postApi(`auth/nonce/verify`, payload);
  if (response.code != 200) {
    return {
      errors: response.message,
    };
  }
  const data = response.data as AuthData;
  await createSession(StorageTypes.ACCESS_TOKEN, data.token, data.expiresIn);
  return data;
};

export const verifySession = async (token?: string) => {
  let headers;
  if (token) {
    headers = {
      headers: {
        Cookie: `${StorageTypes.ACCESS_TOKEN}=${token}`,
      },
    };
  }
  const response = await getApi(`auth/session/verify`, headers);
  if (response.code != 200) {
    return {
      errors: response.message,
    };
  }
  return {
    ok: true,
  };
};

export const getAuthProgress = async () => {
  try {
    const response = await getApi(`auth/onboarding/progress`);
    return response;
  } catch (error: any) {
    return { error: error.message };
  }
};

export const onboardComplete = async (payload: OnBoardComplete) => {
  try {
    const response = await postApi(`auth/onboarded`, payload);
    console.log(response);
    if (response.code != 200) {
      return {
        errors: response.message,
      };
    }
    const data = response.data;
    const session = await encrypt({
      expires: data.expiresIn,
      onboarded: true,
      wallet: data.wallet,
    });
    await createSession(StorageTypes.IS_WELCOME, session, data.expiresIn);
    return {
      ok: true,
    };
  } catch (error: any) {
    console.log(error);
    return { errors: error.message };
  }
};

export const logUserOut = async () => {
  deleteSession(StorageTypes.ACCESS_TOKEN);
};
