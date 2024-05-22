"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/auth.context";
import { publicRoutes } from "@/libs/routes";

export default function withAuth(Component: any) {
  return function WithAuth(props: any) {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { profileProgress, isAuth } = useAuth();
    const isPublicRoute = publicRoutes.includes(pathname);

    useEffect(() => {
      if (profileProgress) {
        if (
          profileProgress < 100 &&
          !pathname.startsWith("/welcome") &&
          !isPublicRoute
        ) {
          router.replace("/welcome");
        }
      }
    }, [profileProgress]);

    useEffect(() => {
      setIsLoading(!isAuth);
    }, [isAuth]);

    if (isLoading) {
      return null;
    }

    return <Component {...props} />;
  };
}
