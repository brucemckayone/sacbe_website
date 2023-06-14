import { r } from '@/types/affiliatePaymentLinkType';
import adminInit from '@/utils/firebase/admin_init'
import { firestore } from 'firebase-admin'
import { NextRequest, NextResponse } from 'next/server'
adminInit();
const db = firestore()
export async function GET(request: NextRequest) {
    
    const probs = db.collection("analytics").doc('gender').get()
    
    return NextResponse.json((await probs).data())
}

export async function POST(request: NextRequest) {
    
   const body = await request.json();
    const awnsers = body.awnser as string;
    console.log(body);
    

    const prev = await db.collection("analytics").doc('gender').get();
    
    
    const data = prev.data() as any;
    

    if (awnsers.toLowerCase() === "male") {
        data.male += 1;
    } else if (awnsers.toLowerCase() === "female") {
        data.female += 1;
    } else if (awnsers.toLowerCase() === "trans male") {
        data.transMale += 1;
    } else if (awnsers.toLowerCase() === "trans female") {
        data.transFemale += 1;
    } else if (awnsers.toLowerCase() === "non-binary") {
        data.nonBinary += 1;
    } else if (awnsers.toLowerCase() === "i prefer not to say") {
        data.preferNotToSay += 1;
    }

    const probs = await db.collection("analytics").doc('gender').set(data, { merge: true });
    return NextResponse.json({success: true});
    
}; 