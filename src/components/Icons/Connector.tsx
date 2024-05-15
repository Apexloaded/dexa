import metamask from "@/assets/images/metamask.png";
import walletconnect from "@/assets/images/walletconnect.webp";
import coinbase from "@/assets/images/coinbase.webp";

import Icon from "@/assets/logo/icon.png";

export const connectorIcons: any = {
  coinbaseWalletSDK: {
    key: "coinbaseWallet",
    icon: coinbase,
  },
  walletConnect: {
    key: "walletConnect",
    icon: walletconnect,
  },
  metaMaskSDK: {
    key: "io.metamask",
    icon: metamask,
  },
};

export const favicon = {
  main: Icon,
};
