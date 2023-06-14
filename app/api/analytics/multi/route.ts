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
    
    const body = await request.json()
    const awnser = body.awnser as string[];
    const docId = body.endpoint as string;
    const prev = await db.collection("analytics").doc(docId).get();
    const data = prev.data() as any;
    
    for (let i = 0; i < awnser.length; i++)
        data[awnser[i]] += 1;

    await db.collection("analytics").doc(docId).set(data);

    return NextResponse.json({success: true});
}; 