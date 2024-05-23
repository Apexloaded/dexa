export interface UserInterface {
  id: string;
  name?: string;
  username?: string;
  wallet?: string;
  bio?: string;
  banner?: string;
  pfp?: string;
  updatedAt?: string;
  createdAt?: string;
  website?: string;
}

export interface FriendListInterface {
  id: string;
  name: string;
  username: string;
  pfp: string;
}

export interface AuthData {
  expiresIn: number;
  ok?: boolean;
  token: string;
  user: UserInterface;
}

export interface UserBalance {
  name?: string | undefined;
  icon?:
    | (({
        width,
        height,
      }: {
        width?: string;
        height?: string;
      }) => React.JSX.Element)
    | undefined;
  address?: string | undefined;
  tokenAddress: string;
  balance: string;
}
