import adminInit from '@/lib/firebase/admin_init'
import { firestore } from 'firebase-admin'
import { NextRequest, NextResponse } from 'next/server'
adminInit();
const db = firestore()

export async function POST(request: NextRequest) {
    
    const body = await request.json()
    const awnser = body.answer as string;
    const docId = body.endpoint as string;
    const email = body.email as string | null | undefined;

    const prev = await db.collection("analytics").doc(docId).get();
    let data = prev.data() as any;
    
    !data && (data = {});

    awnser in data ? data[awnser] += 1 : data[awnser] = 1; 
            
    
    await db.collection("analytics").doc(docId).set(data);

    if (email)
        saveUserAwnsersForEmailSignup(email, [awnser], docId);
    return NextResponse.json({success: true});
}; 


function saveUserAwnsersForEmailSignup(email: string, awnsers: string[], listName: string) { 
    db.collection('segmentation').doc(email).set({[listName]: awnsers}, {merge: true});
}