import React from "react";
import Aside from "@/components/Layouts/Aside";
import Section from "@/components/Layouts/Section";
import PostDetails from "@/components/Posts/PostDetails";
import BackButton from "@/components/ui/BackButton";
import { Post } from "@/interfaces/feed.interface";
import { Contract, ethers } from "ethers";
import { BSC_RPC_URL, DEXA_FEEDS } from "@/config/env";
import { getAllFeedsABI } from "@/contracts/DexaFeeds.sol/getAllFeeds";

export const revalidate = 0;

export async function generateStaticParams() {
  const provider = new ethers.JsonRpcProvider(BSC_RPC_URL);
  const contract = new Contract(DEXA_FEEDS!, getAllFeedsABI, provider);
  const feeds = await contract.listAllPosts();
  return feeds.map((feed: Post) => ({
    username: feed.creator.username,
    id: feed.id,
  }));
}

type Props = {
  params: { username: string; id: string };
};

function MintDetails({ params: { id } }: Props) {
  return (
    <div className="flex space-x-5">
      <Section>
        <div className="py-3 px-2 bg-white xl:bg-white/95 sticky z-50 top-0">
          <div className="flex items-center justify-start space-x-2">
            <BackButton />
            <p className="text-xl font-semibold">Post</p>
          </div>
        </div>
        <div>
          <PostDetails id={id} />
        </div>
      </Section>
      <Aside>
        <div></div>
      </Aside>
    </div>
  );
}

export default MintDetails;
