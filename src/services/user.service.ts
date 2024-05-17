"use server";

import { getApi, uploadApi } from "./api.service";

export async function getProfile(username: string) {
  const response = await getApi(`user/profile/${username}`);
  return response;
}

export async function updateProfile(payload: FormData) {
  const response = await uploadApi("user/update", payload);
  return response;
}
