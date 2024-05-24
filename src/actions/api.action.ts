"use server";

import axios from "axios";
import { API_URL } from "@/config/env";
import { StorageTypes } from "@/libs/enum";
import { cookies } from "next/headers";

const API = API_URL;

export async function getApi(url: string) {
  const cookie = cookies().get(StorageTypes.ACCESS_TOKEN)?.value;
  const apiUrl = `${API}/${url}`;
  return axios
    .get(apiUrl, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    })
    .then((res) => res.data);
}

export const postApi = async (url: string, data: any) => {
  const cookie = cookies().get(StorageTypes.ACCESS_TOKEN)?.value;
  const apiUrl = `${API}/${url}`;
  const payload = data;
  return axios
    .post(apiUrl, payload, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    })
    .then((res) => res.data);
};

export const uploadApi = async (
  url: string,
  data: any
  //setProgress: (value: number) => void
) => {
  const cookie = cookies().get(StorageTypes.ACCESS_TOKEN)?.value;
  const apiUrl = `${API_URL}/${url}`;
  const payload = data;
  return axios
    .post(apiUrl, payload, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${cookie}`,
      },
      onUploadProgress: (progressEv) => {
        if (!progressEv.total) return;
        const percentage = Math.round(
          (progressEv.loaded * 100) / progressEv.total
        );
        console.log(percentage);
      },
    })
    .then((res) => res.data);
};
