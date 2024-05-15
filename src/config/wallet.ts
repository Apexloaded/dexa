import { type Chain } from "viem";
import { GREEN_CHAIN_ID, GREENFIELD_RPC_URL } from "./env";

export const greenFieldTestnet = {
  id: GREEN_CHAIN_ID,
  name: "greenfield",
  nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
  rpcUrls: {
    default: {
      http: [GREENFIELD_RPC_URL],
    },
    public: {
      http: [GREENFIELD_RPC_URL],
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
