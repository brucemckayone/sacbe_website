import emailSender from '@/lib/email/nodemailer';
import adminInit from '@/lib/firebase/admin_init'
import { firestore } from 'firebase-admin'

import { NextRequest, NextResponse } from 'next/server'
adminInit();
const db = firestore();

export async function POST(request: NextRequest) {
    const body = await request.json();
    db.collection('AskAQuestion').doc(body.email).set({ [Date.now()]: {question: body.question, email:body.email}}, { merge: true });
    new emailSender().send({
        to: 'brucemckayone@gmail.com',
        subject: `${body.email} Somebody asked a question on the website`,
        bodyMessage: `${body.email} asked a question on the website`,
        htmlContent: `<h1>${body.email} asked a question on the website</h1><p>${body.question}</p>`,
        replayTo: body.email,
        sender: "askAQuestion@sacbe-ceremonial-cacao.com"
    })        
    return NextResponse.json({ question: body.question, email: body.email, success: true });
}