import { fetchGetJSON } from "@/utils/stripe/fetchPostJson";
import Stripe from "stripe";

async function getStripeBalance(accountId: string) {
  const account: Stripe.Balance = await fetchGetJSON(
    `/api/stripe/affiliate/balance?accountId=${accountId}`
  );
  return account;
}

export default getStripeBalance;
