import adminInit from "@/lib/firebase/admin_init";
import { firestore } from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  adminInit();
  const db = firestore();
  const randomNumber = Math.random();
  const snap = await db
    .collection("quickQuestions")
    .where("randomNumber", ">=", randomNumber)
    .limit(1)
    .get();
  if (snap.docs.length === 0) {
    const snap = await db
      .collection("quickQuestions")
      .where("randomNumber", "<=", randomNumber)
      .limit(1)
      .get();
    const data = snap.docs[0].data();

    return NextResponse.json(data);
  }
  const data = snap.docs[0].data();

  return NextResponse.json(data);
}
