import { fetchGetJSON } from "@/utils/stripe/fetchPostJson";
import Stripe from "stripe";

async function getStripeBalance(accountId: string) {
  console.log(accountId);
  const account: Stripe.Balance = await fetchGetJSON(
    `/api/stripe/affiliate/balance?accountId=${accountId}`
  );
  console.log(account);
  return account;
}

export default getStripeBalance;
