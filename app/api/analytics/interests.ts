import adminInit from '@/lib/firebase/admin_init'
import { firestore } from 'firebase-admin'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    adminInit();
    const db = firestore()
    const { email, intrests } = await request.json() 
    
    if (email) { 
        ///TODO: add intrests to users in mailchimp
    }

    
   
}