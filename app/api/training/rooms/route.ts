import adminInit, { admin } from "@/lib/firebase/admin_init";
import { fetchRoomStock } from "@/lib/training/roomHandler";
import CollectionHelper from "@/utils/firebase/collectionHelper";
import { NextRequest, NextResponse } from "next/server";
// const getHelper = () => new CollectionHelper(adminInit().firestore());
export async function GET(req: NextRequest) {
  return NextResponse.json(await fetchRoomStock());
}
