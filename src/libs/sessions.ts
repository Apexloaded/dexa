import { cookies } from "next/headers";

export function createSession() {
  cookies().set("dexa", "hello", { expires: 7 * 24 * 60 * 60, path: "/" });
}
