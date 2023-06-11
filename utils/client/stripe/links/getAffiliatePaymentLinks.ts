import { fetchGetJSON } from "@/utils/stripe/fetchPostJson";
import { PaymentLinkListType } from "@/types/affiliatePaymentLinkType";
async function getAffiliatePaymentLinks(accountId: string) {  
  const links = await fetchGetJSON(`/api/affiliate/link?uuid=${accountId}`);
  return links as PaymentLinkListType;
}

export default getAffiliatePaymentLinks;
