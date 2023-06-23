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
            const shippingCost = parseInt(req.query.shippingCost as string);
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
                invoice_creation: {
                    invoice_data: {
                        footer: "Thank you for your purchase!",
                        rendering_options: {
                            amount_tax_display: "exclude_tax",
                    
                        }
                    },
                    enabled: true,
                },
                shipping_options: [
                    {   
                        shipping_rate_data: {
                            display_name: "Standard Shipping",
                            fixed_amount: {
                                currency: "gbp",
                                amount: shippingCost*100,
                            },
                            type: "fixed_amount",                            
                        },

                    },
                ]
            };
            let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
            if (bulkQty>=5) {
                lineItems.push({ price: "price_1NLYCPG859ZdyFmpUm8QEV1k", quantity: bulkQty });
            };
            if (retailQty>=5) {
                lineItems.push({ price: "price_1NLYCAG859ZdyFmpdYI5HGd1", quantity: retailQty });
            };
            console.log(lineItems);
            
            payload = {...payload, line_items: lineItems};
            const session = await stripe.checkout.sessions.create(payload);
            return res.status(200).json({url:session.url})
        }
        return res.status(200).json({'message':'ok'})
    
}