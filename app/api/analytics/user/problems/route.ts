import adminInit from '@/utils/firebase/admin_init'
import { firestore } from 'firebase-admin'
import { NextRequest, NextResponse } from 'next/server'
adminInit();
    const db = firestore()
export async function GET(request: NextRequest) {
    
    

    const probs = db.collection("analytics").doc('problems').get()
    
    return NextResponse.json((await probs).data())
}

export async function POST(request: NextRequest) {
    
    const body = await request.json();
    
    console.log(body);
    
    // const probs = db.collection("analytics").doc('problems').set(answers.map((e: any) => { return { problem: e ,count:1  } }), { merge: true });
    
};