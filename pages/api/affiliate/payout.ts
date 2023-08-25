import { NextApiRequest, NextApiResponse } from "next";
import stripe from "@/lib/stripe/stripe";
import { firestore } from "firebase-admin";

const db = firestore();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestType = req.method as requestMethodType;
  switch (requestType) {
    case "GET":
        
    break;
    case "POST":
        
    case "PUT":
    break;
    case "PATCH":
    break;
    case "DELETE":
    break;
  }
}

interface ICreatePayOut{ 
    amount: number,
    accountId: string,
    sourceTransation: string,
    coupon:string
}

export const createTransferByAccoundId = ({ amount, accountId, sourceTransation,coupon }:ICreatePayOut) => { 
    stripe.transfers.create({
        destination: accountId,
        currency: "GBP",
        amount: amount,
        description: `Transfer was made on account of a customer using the coupon: ${coupon}, Thank you for sharing the medicine`,
        metadata: {
            coupon: coupon
        },
        source_transaction: sourceTransation
    });
};

export const getAccountIdFromCoupon = async  (coupon:string) => { 
    const snap = await db.collection("coupons").doc(coupon).get();
    if (snap.exists) { 
        const userData = snap.data();
        if (userData)
            return userData["accountId"];
        else
            return null;
    }
}



const updateCoupon = () => { };
const couponExists = () => { };
const deleteCoupon = () => { };