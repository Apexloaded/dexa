import React from "react";
import { NextPage } from "next";
import { UserInterface } from "@/interfaces/user.interface";
import { ethers, Contract } from "ethers";
import { BSC_RPC_URL, DEXA_CREATOR } from "@/config/env";
import { findAllCreatorsABI } from "@/contracts/DexaCreator.sol/findAllCreators";
import Messages from "@/components/Messages/Messages";

type Props = {
  params: { address: string };
};

export async function generateStaticParams() {
  const provider = new ethers.JsonRpcProvider(BSC_RPC_URL);
  const contract = new Contract(
    `${DEXA_CREATOR}`,
    findAllCreatorsABI,
    provider
  );
  const creators = await contract.findAllCreators();
  return creators.map((creator: UserInterface) => ({
    address: creator.wallet,
  }));
}

const ReadMessage: NextPage<Props> = ({ params }) => {
  return <Messages receiver={params.address} />;
};

export default ReadMessage;
