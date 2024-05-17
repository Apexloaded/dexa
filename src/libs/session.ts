import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(
  name: string,
  data: string,
  expiresIn: any
) {
  deleteSession(name);
  cookies().set(name, data, {
    maxAge: expiresIn,
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
}

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

export function deleteSession(name: string) {
  cookies().delete(name);
}
