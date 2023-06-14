import adminInit from '@/utils/firebase/admin_init'
import { firestore } from 'firebase-admin'
import { NextRequest, NextResponse } from 'next/server'
adminInit();
const db = firestore()
export async function GET(request: NextRequest) {
    
    const probs = db.collection("analytics").doc('identity').get()
    
    return NextResponse.json((await probs).data())
}

export async function POST(request: NextRequest) {
    
    const { answers } = await request.json()

    const probs = db.collection("analytics").doc('problems').set(answers.map((e: any) => { return { count: 1, problem: e } }), { merge: true });
    
}; 