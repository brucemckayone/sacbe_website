import api from "@/lib/apiSchema/apiSchema";
import { fetchGetJSON } from "@/utils/http/fetchGetJSON";
import Stripe from "stripe";

async function getAffiliateSales(accountId: string) {
  const sales = await api.affiliate.payments.get({
    data: { accountId: accountId },
  });

  return sales;
}

export default getAffiliateSales;
