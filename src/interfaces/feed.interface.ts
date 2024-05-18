import { VisibilityType } from "@bnb-chain/greenfield-js-sdk";
import { UserInterface } from "./user.interface";

interface MediaType {
  url: string;
  type: string;
}

export interface Post {
  id: string;
  author: string;
  tokenId: string;
  creator: UserInterface;
  content: string;
  createdAt: string;
  updatedAt: string;
  remintPrice: string;
  remintCount: string;
  tipCount: string;
  remintToken: string;
  media: MediaType[];
  isReminted: boolean;
  remintedPost: string;
  remintedBy: string[];
}

export interface CreatePost {
  content: string;
  visibility: VisibilityType;
  bucketName: string;
}

type Props = {
  width?: string;
  height?: string;
};

export interface Coin {
  name: string;
  icon: ({ width, height }: Props) => React.JSX.Element;
  address: string;
}
