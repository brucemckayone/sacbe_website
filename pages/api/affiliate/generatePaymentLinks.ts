import { PaymentLinkListType } from "@/types/affiliatePaymentLinkType";
import { fetchPostJSON } from "@/utils/stripe/fetchPostJson";

async function generatePaymentLinks(accountId: string, uuid: string, priceIds:string[]) {
  return (await fetchPostJSON(`/api/affiliate/link`, {
    accountId: accountId,
    priceIds:priceIds,
    uuid: uuid,
  })) as PaymentLinkListType;
}

export default generatePaymentLinks;
