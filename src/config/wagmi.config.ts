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
    // metaMask,
    // coinbaseWallet({ appName: "Dexa" }),
    walletConnect({
      projectId: "020eb0ca134f43e7080c5727412239d3",
    }),
  ],
  transports: {
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
  },
  //multiInjectedProviderDiscovery: false,
});
