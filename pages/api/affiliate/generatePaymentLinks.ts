import { PaymentLinkListType } from "@/types/affiliatePaymentLinkType";
import { fetchPostJSON } from "@/utils/stripe/fetchPostJson";

async function generatePaymentLinks(accountId: string, uuid: string) {
  return (await fetchPostJSON(`/api/affiliate/link`, {
    accountId: accountId,
    uuid: uuid,
  })) as PaymentLinkListType;
}

export default generatePaymentLinks;
