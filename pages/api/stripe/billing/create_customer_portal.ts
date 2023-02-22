import createCustomerPortal from "@/lib/stripe/create_customer_protal";
import { fetchPostJSON } from "@/utils/stripe/fetchPostJson";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { getOrCreateCustomer } from "../client/create_customer/_create_customer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const portal = await createCustomerPortal({
      customerId: req.body.customerId,
    });
    res.status(200).json(portal);
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: "there was a problem creating the customer portal",
      error: e,
    });
  }
}
