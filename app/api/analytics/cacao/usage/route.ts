import { r } from '@/types/affiliatePaymentLinkType';
import adminInit from '@/utils/firebase/admin_init'
import { firestore } from 'firebase-admin'
import { NextRequest, NextResponse } from 'next/server'
adminInit();
const db = firestore()
export async function GET(request: NextRequest) {
    
    const probs = db.collection("analytics").doc('usage').get()
    
    return NextResponse.json((await probs).data())
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const awnsers = body.awnser as string;
    console.log(body);
    

    const prev = await db.collection("analytics").doc('usage').get();
    
    
    const data = prev.data() as any;
    

    if (awnsers.toLowerCase() === "daily") {
        data.daily += 1;
    } else if (awnsers.toLowerCase() === "a few times a week") {
        data.weekly += 1;
    } else if (awnsers.toLowerCase() === "a few times a month") {
        data.monthly += 1;
    } else if (awnsers.toLowerCase() === "i have never tried cacao") {
        data.never += 1;
    }

    const probs = await db.collection("analytics").doc('usage').set(data, { merge: true });

    return NextResponse.json({success: true});
    
}; 