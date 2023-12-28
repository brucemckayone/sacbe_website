import { NextRequest, NextResponse } from "next/server";

import adminInit from "@/lib/firebase/admin_init";

import RecipeApiHelper from "./RecipeApiHandler";

export async function GET(request: NextRequest) {
  const helper = new RecipeApiHelper(adminInit().firestore());
  const params = new URL(request.url).searchParams;

  const withRelated =
    params.has("withRelated") || params.get("withRelated") == "true";

  return NextResponse.json(
    await helper.getBySlug(
      request.nextUrl.pathname.split("/").pop()!,
      withRelated
    )
  );
}
