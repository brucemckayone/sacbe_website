import api from "@/lib/apiSchema/apiSchema";
import Stripe from "stripe";

async function getStripeBalance(accountId: string): Promise<Stripe.Balance> {
  const resp = await api.affiliate.balance.get({
    data: { accountId: accountId },
  });
  return resp;
}

export default getStripeBalance;
