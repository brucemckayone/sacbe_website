import homeUrl from "@/lib/constants/urls";
import { fetchGetJSON } from "@/utils/stripe/fetchPostJson";
async function getAffiliateBalance(accountId: string) {
  return await fetchGetJSON(`/api/stripe/payments?accountId=${accountId}`);
}

export default getAffiliateBalance;
