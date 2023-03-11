import { fetchGetJSON } from "@/utils/stripe/fetchPostJson";
import Stripe from "stripe";
async function getAffiliatePayouts(accountId: string) {
  return (await fetchGetJSON(
    `/api/stripe/affiliate/payouts?accountId=${accountId}`
  )) as Stripe.Response<Stripe.ApiList<Stripe.Payout>>;
}

export default getAffiliatePayouts;
