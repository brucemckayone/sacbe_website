import adminInit from "@/lib/firebase/admin_init";
import { NextRequest, NextResponse } from "next/server";
import { SetupPaymentLinkApiHelper } from "./SetupPaymentLinkApiHelper";

const getHelper = () => new SetupPaymentLinkApiHelper(adminInit().firestore());

export async function GET(req: NextRequest) {
  const helper = getHelper();
  const params = new URL(req.url).searchParams;
  const resp = await helper.get(params);
  return NextResponse.json(resp);
}

export async function POST(req: NextRequest) {
  const helper = getHelper();
  const resp = await helper.post(await req.json());
  return NextResponse.json(resp);
}

export async function DELETE(req: NextRequest) {
  const helper = getHelper();
  const params = new URL(req.url).searchParams;
  const resp = await helper.delete(params);
  return NextResponse.json(resp);
}
