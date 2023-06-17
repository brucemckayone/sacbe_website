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
    const email = body.email as string | null | undefined;

    const prev = await db.collection("analytics").doc(docId).get();
    let data = prev.data() as any;
    
    if (!data)
        data = {};
    for (let i = 0; i < awnser.length; i++) {
        if (!(awnser[i] in data)) 
            data[awnser[i]] = 0;
        else 
            data[awnser[i]] += 1;
        
    }
    await db.collection("analytics").doc(docId).set(data);

    if (email)
        saveUserAwnsersForEmailSignup(email, awnser, docId);
    return NextResponse.json({success: true});
}; 


export function saveUserAwnsersForEmailSignup(email: string, awnsers: string[], listName: string) { 
    db.collection('segmentation').doc(email).set({[listName]: awnsers}, {merge: true});
}