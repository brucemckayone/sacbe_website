import adminInit from "@/lib/firebase/admin_init";
import { NextRequest, NextResponse } from "next/server";
import { AffiliateRequestHelper } from "./RequestApiHelper";

const getHelper = () => new AffiliateRequestHelper(adminInit().firestore());
export async function GET(request: NextRequest) {
  const helper = getHelper();
  return NextResponse.json(await helper.get(new URL(request.url).searchParams));
}

export async function DELETE(request: NextRequest) {
  const helper = getHelper();
  return NextResponse.json(
    await helper.delete(new URL(request.url).searchParams)
  );
}

export async function POST(request: NextRequest) {
  const helper = getHelper();
  const { body, id } = await request.json();
  return NextResponse.json(await helper.post(body, id));
}

export async function PATCH(request: NextRequest) {
  const helper = getHelper();
  const { body, id } = await request.json();
  return NextResponse.json(await helper.patch(body, id));
}
