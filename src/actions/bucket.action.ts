"use server";

import { postApi } from "./api.action";
import { CreateBucket } from "@/interfaces/bucket.interface";

export const createBucket = async (payload: CreateBucket) => {
  try {
    const response = await postApi("bucket/create", payload);
    console.log(response)
    return response;
  } catch (error) {
    console.log(error)
    return {
      errors: "something went wrong",
    };
  }
};
