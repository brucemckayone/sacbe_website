import { NextApiRequest, NextApiResponse } from "next";
import stripe from "@/lib/stripe/init/stripe";
import Stripe from "stripe";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const charges = req.body.charges as string[];

    let data = {
      failed: [] as string[],
      successed: [] as string[],
      non_existant: [] as string[],
    };
    for (var i = 0; i < charges.length; i++) {
      try {
        const refund = await stripe.refunds.create({
          charge: charges[i] as string,
        });

        if (refund.status == "failed") {
        } else if (refund.status == "succeeded") {
          data.successed = [...data.successed, charges[i]];
        }
      } catch (e) {
        data.non_existant = [...data.non_existant, charges[i]];
      }
    }

    res.status(200).json(data);
  }
}
