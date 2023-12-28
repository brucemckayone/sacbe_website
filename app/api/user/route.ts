import adminInit from "@/lib/firebase/admin_init";
import { NextRequest, NextResponse } from "next/server";
import { UserApiHandler } from "./UserApiHandler";

export async function GET(request: NextRequest) {
  const userApi = new UserApiHandler(adminInit().firestore());
  const response = await userApi.get(new URL(request.url).searchParams);

  if (response?.error) return NextResponse.error();

  return NextResponse.json(response);
}

export async function DELETE(request: NextRequest) {
  const userApi = new UserApiHandler(adminInit().firestore());
  const response = await userApi.delete(new URL(request.url).searchParams);

  return NextResponse.json(response);
}

export async function PATCH(request: NextRequest) {
  const userApi = new UserApiHandler(adminInit().firestore());
  const body = await request.json();

  const response = await userApi.patch(body);

  return NextResponse.json(response);
}
