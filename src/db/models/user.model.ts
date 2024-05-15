export interface UserModel {
  wallet: string;
  nonce?: string;
  isOnboarded: boolean;
  name: string;
  username: string;
  bioURI: string;
}
