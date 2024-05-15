import { FriendListInterface } from "./user.interface";

export interface MessageInterface {
  sender: string;
  message: string;
  timestamp: Date;
}

export interface ChatInterface {
  user: FriendListInterface;
  chat: MessageInterface[];
}
