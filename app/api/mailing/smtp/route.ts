// import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";

import AffiliateSender from "@/lib/email/senders/affiliateSender";

export async function GET() {
  const email = new AffiliateSender();

  // email.sendRequestMade("brucemckayone@gmail.com");
}

// // Username: no-reply@sacbe-ceremonial-cacao.com

// // Password: Use the email account’s password.

// // Incoming Server: gukm1040.siteground.biz

// // IMAP Port: 993

// // Outgoing Server: gukm1040.siteground.biz

// // SMTP Port: 465
