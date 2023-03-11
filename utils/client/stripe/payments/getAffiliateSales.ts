import { fetchGetJSON } from "@/utils/stripe/fetchPostJson";
import homeUrl from "@/lib/constants/urls";
import Stripe from "stripe";
async function getAffiliateSales(accountId: string) {
  const sales = (await fetchGetJSON(
    `${homeUrl}/api/stripe/affiliate/payments?accountId=${accountId}`
  )) as Stripe.Response<Stripe.ApiList<Stripe.Charge>>;
  return sales;
}

export default getAffiliateSales;
