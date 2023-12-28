import { fetchGetJSON } from "@/utils/http/fetchGetJSON";
import Stripe from "stripe";
async function getAffiliateSales(accountId: string) {
  return (await fetchGetJSON(
    `/api/stripe/affiliate/payments?accountId=${accountId}`
  )) as Stripe.Response<Stripe.ApiList<Stripe.Charge>>;
}

export default getAffiliateSales;
