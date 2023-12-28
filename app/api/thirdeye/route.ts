import { NextRequest, NextResponse } from 'next/server'
import { convertStripeInvoiceToWoocommerceOrder, createWoocommerceOrder } from './woo';

export async function POST(request: NextRequest) { 
    return NextResponse.json(await convertStripeInvoiceToWoocommerceOrder(await request.json()))
}

