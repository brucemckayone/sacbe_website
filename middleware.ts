// // middleware.ts
// import { NextURL } from "next/dist/server/web/next-url";
// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";
// import homeUrl from "./lib/constants/urls";

// // Limit the middleware to paths starting with `/api/`
// export const config = {
//   matcher: ["/affiliates"],
// };

// export async function middleware(request: NextRequest) {
//   // Call our authentication function to check the request
//   const token = await getToken({
//     req: request,
//     secret: process.env.SECRET,
//   });
//   console.log("middle ware has been called");
//   if (request.nextUrl.pathname.startsWith("/portal")) {
//     return NextResponse.rewrite(new NextURL("/auth/signin", request.url));
//   }
//   if (!token) {
//     if (request.nextUrl.pathname.startsWith("/portal")) {
//       return NextResponse.rewrite(new NextURL("/auth/signin", request.url));
//     }
//     if (request.nextUrl.pathname.startsWith("/auth/signin")) {
//       const redirect = new URL(request.url);

//       return NextResponse.rewrite(
//         new NextURL(redirect.searchParams.get("callbackUrl")!, homeUrl)
//       );
//     }
//   }
// }
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const user = await checkAuthentication(request);

  console.log(`is Authenticated: ${await checkAuthentication(request)} `);

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
