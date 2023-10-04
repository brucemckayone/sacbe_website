import { NextRequest, NextResponse } from 'next/server'
import { createWoocommerceOrder } from './woo';

export async function POST(request: NextRequest) { 
    return NextResponse.json(createWoocommerceOrder(await request.json()))
}

