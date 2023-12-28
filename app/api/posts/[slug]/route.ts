import { NextRequest, NextResponse } from "next/server";
import adminInit from "@/lib/firebase/admin_init";
import PostApiHelper from "./PostsAPIHandler";

export async function GET(request: NextRequest) {
  const helper = new PostApiHelper(adminInit().firestore());
  const params = new URL(request.url).searchParams;
  const slug = request.nextUrl.pathname.split("/").pop()!;
  const withRelated =
    params.has("withRelated") || params.get("withRelated") == "true";
  const response = await helper.getBySlug(slug, withRelated);
  console.log("HEEERRREE", new URL(request.url));
  return NextResponse.json(response);
}
