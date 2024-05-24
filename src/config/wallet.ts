import { type Chain } from "viem";
import { GREEN_CHAIN_ID, GRPC_URL } from "./env";

export const greenFieldTestnet = {
  id: GREEN_CHAIN_ID,
  name: "greenfield",
  nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
  rpcUrls: {
    default: {
      http: [GRPC_URL],
    },
    public: {
      http: [GRPC_URL],
    },
  },
  blockExplorers: {
    default: {
      name: "BNB Greenfield Explorer",
      url: "https://testnet.greenfieldscan.com/",
    },
  },
  testnet: true,
} as const satisfies Chain;
