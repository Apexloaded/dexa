"use server";

import { SiweMessage } from "siwe";
import { createSession, deleteSession, encrypt } from "@/libs/session";
import { AuthData, OnBoardComplete } from "@/interfaces/user.interface";
import { StorageTypes } from "@/libs/enum";
import { getApi, postApi } from "./api.service";

export const getNonce = async (wallet: `0x${string}`) => {
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
  if (response.status != true) {
    return {
      errors: response.message,
    };
  }
  const data = response.data as AuthData;
  await createSession(StorageTypes.ACCESS_TOKEN, data.token, data.expiresIn);
  return data;
};

export const onboardComplete = async (payload: OnBoardComplete) => {
  try {
    const response = await postApi(`user/onboarded`, payload);
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
    return { errors: error.message };
  }
};

export const logUserOut = async () => {
  deleteSession(StorageTypes.ACCESS_TOKEN);
};
