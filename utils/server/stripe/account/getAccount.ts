import { fetchGetJSON } from "@/utils/stripe/fetchPostJson";
import Stripe from "stripe";

async function getStripeAccount(accountId: string) {
  const account: Stripe.Account = await fetchGetJSON(
    `/api/stripe/affiliate/account?accountId=${accountId}`
  );
  return account;
}

export default getStripeAccount;
