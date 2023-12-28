import adminInit, { admin } from "@/lib/firebase/admin_init";
import CollectionHelper from "@/utils/firebase/collectionHelper";
import { NextRequest, NextResponse } from "next/server";
// const getHelper = () => new CollectionHelper(adminInit().firestore());

export async function GET(req: NextRequest) {
  const json = await req.json();
  const qs = json.questions;

  qs.map((q: any) => {
    const body = {
      awnsers: q.awnsers,
      endpoint: q.endpoint,
      randomNumber: Math.random(),
      question: q.question,
    };
    adminInit().firestore().collection("quickQuestions").add(body);
  });
}
const randomNumber = Math.random();
console.log(randomNumber);
export async function POST(req: NextRequest) {
  throw NextResponse.error();
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
