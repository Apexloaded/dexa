import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { StorageTypes } from "./libs/enum";
import { API_URL } from "./config/env";

const protectedRoutes = ["/home", "/welcome"];
const publicRoutes = ["/login", "/signup", "/test", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = cookies().get(StorageTypes.ACCESS_TOKEN)?.value;
  const verifyRes = await fetch(`${API_URL}/auth/session/verify`, {
    method: "GET",
    headers: {
      Cookie: `${StorageTypes.ACCESS_TOKEN}=${cookie}`,
    },
  });
  const verifyData = await verifyRes.json();
  if (verifyData.message != "success" && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (verifyData.message == "success") {
    // const isOnboarded = cookies().get(StorageTypes.IS_WELCOME)?.value;
    // if (
    //   !isOnboarded &&
    //   !req.nextUrl.pathname.startsWith("/welcome") &&
    //   !isPublicRoute
    // ) {
    //   return NextResponse.redirect(new URL("/welcome", req.nextUrl));
    // }
    const progressRes = await fetch(`${API_URL}/auth/onboarding/progress`, {
      method: "GET",
      headers: {
        Cookie: `${StorageTypes.ACCESS_TOKEN}=${cookie}`,
      },
    });
    const progressData = await progressRes.json();
    console.log(progressData);
    if (
      progressData?.data.progress < 100 &&
      !req.nextUrl.pathname.startsWith("/welcome") &&
      !isPublicRoute
    ) {
      return NextResponse.redirect(new URL("/welcome", req.nextUrl));
    }

    if (
      progressData.data.progress >= 100 &&
      req.nextUrl.pathname.startsWith("/welcome")
    ) {
      return NextResponse.redirect(new URL("/home", req.nextUrl));
    }
  }

  //   // 6. Redirect to /dashboard if the user is authenticated
  //   if (
  //     isPublicRoute &&
  //     session?.userId &&
  //     !req.nextUrl.pathname.startsWith("/dashboard")
  //   ) {
  //     return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  //   }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
