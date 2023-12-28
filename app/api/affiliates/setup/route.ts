import adminInit from "@/lib/firebase/admin_init";
import { NextRequest, NextResponse } from "next/server";
import SetupApiHelper from "./SetupAPIHelper";

export async function GET(request: NextRequest) {
  const helper = new SetupApiHelper(adminInit().firestore());

  return NextResponse.json(await helper.get(new URL(request.url).searchParams));
}
