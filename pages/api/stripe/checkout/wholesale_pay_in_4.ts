//write next js api end point handler for creating a checkout ssession in stripe 
//write next js api end point handler for creating a checkout ssession in stripe
import { NextApiRequest, NextApiResponse } from "next";
import stripe from "@/lib/stripe/stripe";

import Stripe from "stripe";
import homeUrl from "@/lib/constants/urls";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    switch (req.method as requestMethodType) { 
        
        case "POST":
        break;
        case "GET":
            const bulkQty = parseInt(req.query.bulkQty as string);
            const retailQty = parseInt(req.query.retailQty as string);
            let payload: Stripe.Checkout.SessionCreateParams = {
                success_url: homeUrl+'/portal',
                cancel_url: homeUrl,
                payment_method_types: ["klarna", "afterpay_clearpay"],
                mode: "payment",
                customer: req.query.customerId as string,
                billing_address_collection: "required",
                allow_promotion_codes: true,
                shipping_address_collection: {
                    allowed_countries: ["GB"],
                },
                phone_number_collection: {
                    enabled: true,
                },
            };
            let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
            if (bulkQty>=5) {
                lineItems.push({ price: "price_1NGcUGG859ZdyFmpvDONUHlR", quantity: bulkQty });
            };
            if (retailQty>=5) {
                lineItems.push({ price: "price_1NFIoTG859ZdyFmpLRWnJOth", quantity: retailQty });
            };
            console.log(lineItems);
            
            payload = {...payload, line_items: lineItems};
            const session = await stripe.checkout.sessions.create(payload);
            return res.status(200).json({url:session.url})
        }
        return res.status(200).json({'message':'ok'})
    
}