"use server";
import { getApi, uploadApi } from "./api.service";

export async function getSinglePost(id: string) {
  const post = await getApi(`posts/${id}`);
  return post;
}

export async function getAllPost() {
  const posts = await getApi(`posts/list`);
  return posts;
}

export const createPost = async (payload: FormData) => {
  const response = await uploadApi("posts/create", payload);
  return response;
};
