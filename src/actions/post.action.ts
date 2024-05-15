"use server";

import { CreatePost, Post } from "@/interfaces/feed.interface";
import { postApi, uploadApi, getApi } from "./api.action";
import { FeedsService } from "@/services/feeds.service";
import { getContent } from "@/libs/greenfield";
import { UsersService } from "@/services/user.service";

export const createPost = async (payload: FormData) => {
  try {
    const response = await uploadApi("posts/create", payload);
    return response;
  } catch (error) {
    return {
      errors: "something went wrong",
    };
  }
};

export async function getPost(id: string) {
  const post = await getApi(`posts/${id}`);
  return post;
}

export async function getAllPost() {
  const posts = await getApi(`posts/list`);
  return posts;
}

export const findPosts = async (pageNumber: number) => {
  const feedsService = new FeedsService();
  const usersService = new UsersService();
  const posts = await feedsService.find({ isMinted: true }, pageNumber, 10);
  const promises = posts.data.map(async (post) => {
    const user = await usersService.findOne({ wallet: post.wallet });
    const content = await getContent(post.contentURI);
    const metadata = await getContent(post.metaDataURI);
    const author = await getContent(user.bioURI);
    const payload = {
      ...content,
      metadata,
      creator: author,
    };
    return payload;
  });
  const refinedPosts = await Promise.all<Promise<Post>[]>(promises);
  return refinedPosts;
};
