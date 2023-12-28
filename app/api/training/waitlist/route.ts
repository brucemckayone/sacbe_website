import emailSender from "@/lib/email/nodemailer";
import waitlist_signup from "@/lib/email/templates/training/waitlist_signup";
import adminInit, { admin } from "@/lib/firebase/admin_init";
import CollectionHelper from "@/utils/firebase/collectionHelper";
import { messaging } from "firebase-admin";
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
  messaging().send({
    data: {
      title: "New Waitlist Signup: " + body.email,
      body: body.email as string,
    },
    topic: "waitlist",
  });

  new emailSender().send({
    to: body.email as string,
    subject: "Sacbe Facilitator Training Waitlist",
    bodyMessage: `Thank you for signing up for the waitlist for the Sacbe Facilitator Training. We will notify you when the next training is available. In the meantime, please check out our other resources at https://sacbe.co/resources`,
    htmlContent: waitlist_signup(),
    replayTo: "no-reply@sacbe-ceremonial-cacao.com",
    sender: "no-reply@sacbe-ceremonial-cacao.com",
  });

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
