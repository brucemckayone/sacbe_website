import adminInit, { admin } from "@/lib/firebase/admin_init";
import { handleRoomPurchase } from "@/lib/training/roomHandler";
import CollectionHelper from "@/utils/firebase/collectionHelper";
import { NextRequest, NextResponse } from "next/server";
// const getHelper = () => new CollectionHelper(adminInit().firestore());
export async function GET(req: NextRequest) {
  throw NextResponse.error();
}
export async function POST(req: NextRequest) {
  const {
    customerId,
    duration,
    total,
    depositAmount,
    roomType,
    subscriptionId,
  } = await req.json();
  await handleRoomPurchase(
    roomType,
    duration,
    depositAmount
    // customerId,
    // total
  );
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
