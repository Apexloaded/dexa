import { http, createConfig, cookieStorage, createStorage } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";
import { metaMask, coinbaseWallet, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [bsc, bscTestnet],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  connectors: [
    metaMask({ dappMetadata: { name: "Dexa", url: "https://dexa.ink" } }),
    coinbaseWallet({ appName: "Dexa" }),
  ],
  transports: {
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
  },
  multiInjectedProviderDiscovery: false,
});
