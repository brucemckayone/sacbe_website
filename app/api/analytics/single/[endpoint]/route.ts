import adminInit from '@/utils/firebase/admin_init'
import { firestore } from 'firebase-admin'
import { NextRequest, NextResponse } from 'next/server'
adminInit();
const db = firestore()

export async function GET( request: Request,
  { params }: { params: { endpoint: string } }
) {

    console.log(params.endpoint);
    
    const prev = await db.collection("analytics").doc(params.endpoint).get();
    return NextResponse.json(prev.data());
}; 
