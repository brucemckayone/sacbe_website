// // middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const user = await checkAuthentication(request);

  if (!user) {
    if (pathNameIncludes("/portal")) {
      return redirectTo("/auth/signin?");
    }
  } else {
    if (pathNameIncludes("/auth/signin")) {
      if (request.url.includes("callbackUrl")) {
        return redirectToCallbackUrl();
      }
    }
  }

  function redirectToCallbackUrl() {
    const currentUrl = new URL(request.url, request.url);
    return redirectTo(
      currentUrl.searchParams.get("callbackUrl")!.toLowerCase()
    );
  }

  function pathNameIncludes(pathName: string) {
    return request.nextUrl.pathname.startsWith(pathName);
  }

  function redirectTo(redirect: string) {
    return NextResponse.rewrite(new URL(redirect, request.url));
  }
}

async function checkAuthentication(request: NextRequest) {
  return await getToken({
    req: request,
    secret: process.env.SECRET,
  });
}
