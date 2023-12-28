import { fetchGetJSON } from "@/utils/http/fetchGetJSON";

async function getAffiliateBalance(accountId: string) {
  return await fetchGetJSON(`/api/stripe/payments?accountId=${accountId}`);
}

export default getAffiliateBalance;
