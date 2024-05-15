import { BNB, BabyDoge, LINK, TUSD } from "@/components/Icons/NetworkIcons";
import { Coin } from "@/interfaces/feed.interface";
import { ZeroAddress } from "ethers";

export const Tokens: Coin[] = [
  {
    address: ZeroAddress,
    name: "BNB",
    icon: BNB,
  },
  {
    address: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
    name: "TUSD", // USDT
    icon: TUSD,
  },
  {
    address: "0x2fC661046c3365ecb408a491F14828eA90587304",
    name: "Baby Doge", // Decoin
    icon: BabyDoge,
  },
  {
    address: "0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06",
    name: "LINK", // Link
    icon: LINK,
  },
];


