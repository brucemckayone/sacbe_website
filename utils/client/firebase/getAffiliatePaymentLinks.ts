import { fetchGetJSON } from "@/utils/stripe/fetchPostJson";
import Stripe from "stripe";
async function getAffiliateSales(accountId: string) {
  console.log(accountId);

  return (await fetchGetJSON(
    `/api/stripe/affiliate/payments?accountId=${accountId}`
  )) as Stripe.Response<Stripe.ApiList<Stripe.Charge>>;
}

export default getAffiliateSales;
