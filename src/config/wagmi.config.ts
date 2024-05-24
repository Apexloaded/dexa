import { http, createConfig, cookieStorage, createStorage } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";
import { metaMask, coinbaseWallet, walletConnect, injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [bsc, bscTestnet],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  connectors: [
    // metaMask({
    //   dappMetadata: { url: "https://dexa.ink", name: "Dexa App", iconUrl: "" },
    //   // checkInstallationImmediately: false,
    //   // forceInjectProvider: false,
    //   // extensionOnly: false
    // }),
    // injected(),
    walletConnect({
      projectId: "020eb0ca134f43e7080c5727412239d3",
    }),
    coinbaseWallet({ appName: "Dexa" }),
  ],
  transports: {
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
  },
  multiInjectedProviderDiscovery: true,
});
