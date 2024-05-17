"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { API_URL } from "@/config/env";
import { StorageTypes } from "@/libs/enum";

const API = API_URL;
const cookie = cookies().get(StorageTypes.ACCESS_TOKEN)?.value;

export const getApi = async (url: string) => {
  const apiUrl = `${API}/${url}`;
  return axios
    .get(apiUrl, {
      withCredentials: true,
      headers: {
        Cookie: `${StorageTypes.ACCESS_TOKEN}=${cookie}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
};

export const postApi = async (url: string, data: any) => {
  const apiUrl = `${API}/${url}`;
  const payload = data;
  return axios
    .post(apiUrl, payload, {
      withCredentials: true,
      headers: {
        Cookie: `${StorageTypes.ACCESS_TOKEN}=${cookie}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

export const patchApi = async (url: string, data: any) => {
  const apiUrl = `${API}/${url}`;
  const payload = data;
  return axios
    .patch(apiUrl, payload, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const deleteApi = async (url: string) => {
  const apiUrl = `${API}/${url}`;
  return axios
    .delete(apiUrl, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const headApi = async (url: string) => {
  return axios
    .head(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const uploadApi = async (
  url: string,
  data: any
  //setProgress: (value: number) => void
) => {
  console.log(cookies().get(StorageTypes.ACCESS_TOKEN));
  const apiUrl = `${API_URL}/${url}`;
  const payload = data;
  return axios
    .post(apiUrl, payload, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        Cookie: `${StorageTypes.ACCESS_TOKEN}=${cookie}`,
      },
      onUploadProgress: (progressEv) => {
        if (!progressEv.total) return;
        const percentage = Math.round(
          (progressEv.loaded * 100) / progressEv.total
        );
        console.log(percentage);
        //setProgress(percentage);
      },
    })
    .then((response) => {
      return response.data;
    });
};
