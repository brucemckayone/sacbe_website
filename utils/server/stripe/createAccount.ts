import { fetchPostJSON } from "@/utils/stripe/fetchPostJson";

import Stripe from "stripe";
async function createStripeAccount(email: string) {
  const account: Stripe.Account = await fetchPostJSON(
    "/api/stripe/affiliate/account",
    {
      email: email,
    }
  );
  return account;
}

export default createStripeAccount;
