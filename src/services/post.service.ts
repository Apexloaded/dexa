import { getApi, uploadApi } from "./api.service";
import { v4 as uuidv4 } from "uuid";

export const createPost = async (payload: FormData) => {
  const response = await uploadApi("posts/create", payload);
  return response;
};

export const generatePostId = async () => {
  return generateId();
};

export async function generateId() {
  return uuidv4();
}