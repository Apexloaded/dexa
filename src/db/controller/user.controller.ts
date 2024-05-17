"use server";

import { UserService } from "../services/auth.service";

export async function onboardingProgress(wallet: string) {
  const uService = new UserService();
  const user = await uService.findUser({
    wallet: wallet.toLowerCase(),
  });
  return user;
}
