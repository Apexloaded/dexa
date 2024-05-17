import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { StorageTypes } from "./libs/enum";
import { API_URL } from "./config/env";

export const protectedRoutes = ["/home", "/welcome"];
export const publicRoutes = ["/login", "/signup", "/test", "/"];

const get = async (url: string, cookie?: string) => {
  const response = await fetch(`${API_URL}/${url}`, {
    method: "GET",
    headers: {
      Cookie: `${StorageTypes.ACCESS_TOKEN}=${cookie}`,
    },
  });
  const data = await response.json();
  return data;
};

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = cookies().get(StorageTypes.ACCESS_TOKEN)?.value;
  const verifyRes = await get("auth/session/verify", cookie);
  if (
    verifyRes.statusCode != 200 &&
    verifyRes.data?.message != "success" &&
    isProtectedRoute
  ) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (verifyRes?.data?.message == "success") {
    const res = await get("auth/onboarding/progress", cookie);
    if (
      res?.data.progress < 100 &&
      !req.nextUrl.pathname.startsWith("/welcome") &&
      !isPublicRoute
    ) {
      return NextResponse.redirect(new URL("/welcome", req.nextUrl));
    }

    if (
      res.data.progress >= 100 &&
      req.nextUrl.pathname.startsWith("/welcome")
    ) {
      return NextResponse.redirect(new URL("/home", req.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.ico$|.*\\.png$).*)"],
};
