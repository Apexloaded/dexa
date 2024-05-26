"use server";

import { SiweMessage } from "siwe";
import { cookies } from "next/headers";
import { StorageTypes } from "@/libs/enum";
import { AuthData } from "@/interfaces/user.interface";
import { redirect } from "next/navigation";
import { postApi, getApi, uploadApi } from "./api.action";
import { IActionResponse } from "@/interfaces/response.interface";

type IVerifyNonce = {
  message: string;
  signature: string;
};

export async function registerUser(wallet: string) {
  try {
    const payload = {
      wallet,
      nonce: "",
    };
    const response = await postApi("auth/register", payload);
    const data = response.data;
    if (response.status == true) {
      return { status: true, message: "success" };
    }
    return { status: false, message: "false" };
  } catch (error: any) {
    return { status: false, message: `${error.message}` };
  }
}

export async function verifyNonce({
  signature,
  message,
}: IVerifyNonce): Promise<IActionResponse> {
  try {
    const siwe = new SiweMessage(JSON.parse(message));
    const payload = {
      message: siwe,
      signature: signature,
    };
    const response = await postApi("auth/nonce/verify", payload);
    const data = response.data as AuthData;
    if (data.ok) {
      const exp = Number(data.expiresIn) - 24 * 60 * 60;
      cookies().set(StorageTypes.ACCESS_TOKEN, data.token, {
        httpOnly: false,
        path: "/",
        sameSite: "strict",
        secure: false,
        expires: Date.now() + exp * 1000,
      });
      return { status: true, message: "success" };
    }
    return { status: false, message: "false" };
  } catch (error: any) {
    return { status: false, message: `${error.message}` };
  }
}

export async function getNonce(wallet: string): Promise<IActionResponse> {
  try {
    const response = await getApi(`auth/nonce/generate?wallet=${wallet}`);
    const data = response.data;
    if (response.status == true && response.statusCode == 200) {
      return { status: true, message: "success", data: { nonce: data.nonce } };
    }
    return { status: false, message: "false" };
  } catch (error: any) {
    return { status: false, message: `${error.message}` };
  }
}

export async function updateProfile(
  payload: FormData
): Promise<IActionResponse> {
  try {
    const response = await uploadApi("user/update", payload);
    const data = response.data;
    if (response.status == true && response.statusCode == 201) {
      return {
        status: true,
        message: "success",
        data: { nonce: data.nonce },
      };
    }
    return { status: false, message: "false" };
  } catch (error: any) {
    return { status: false, message: `${error.message}` };
  }
}

export async function clearSession() {
  cookies().delete(StorageTypes.ACCESS_TOKEN);
  redirect("/login");
}
