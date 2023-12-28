import adminInit, { admin } from "@/lib/firebase/admin_init";
import CollectionHelper from "@/utils/firebase/collectionHelper";
import { NextRequest, NextResponse } from "next/server";
const getHelper = () =>
  new CollectionHelper(
    adminInit().firestore().collection("FacilitatorTraining")
  );
export async function GET(req: NextRequest) {
  throw NextResponse.error();
}
export async function POST(req: NextRequest) {
  const body = await req.json();
  const db = getHelper();
  const doc = await db.getDoc("waitlist");
  const data = doc.data!;
  data.emails.push(body.email as string);
  db.updateDoc("waitlist", data);
  return NextResponse.json({ message: "success" });
}

export async function DELETE(req: NextRequest) {
  throw NextResponse.error();
}
export async function PATCH(req: NextRequest) {
  throw NextResponse.error();
}
export async function PUT(req: NextRequest) {
  throw NextResponse.error();
}
