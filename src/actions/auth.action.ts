"use server";
import { StorageTypes } from "@/libs/enum";
import { decrypt } from "@/libs/session";
import axios from "axios";
import { cookies } from "next/headers";

export async function onBoard() {
  const cookie = cookies().get(StorageTypes.ACCESS_TOKEN)?.value;
  if (!cookie) {
    return;
  }
  const token: any = await decrypt(cookie);
  const response = await fetch(
    `http://localhost:3000/api/auth/${token.wallet}`,
    {
      method: "GET",
    }
  );
  const user = await response.json();
  const selectedFields = ["name", "username"];
  const completedFields = selectedFields.filter(
    (fieldName) =>
      user[fieldName] !== null &&
      user[fieldName] !== undefined &&
      user[fieldName] !== false
  ).length;

  const completetionPercentage =
    (completedFields / selectedFields.length) * 100;

  const payload = {
    progress: completetionPercentage,
  };
  return payload;
}
