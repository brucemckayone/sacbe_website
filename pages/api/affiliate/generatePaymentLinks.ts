import homeUrl from "@/lib/constants/urls";
import { PaymentLinkListType } from "@/types/affiliatePaymentLinkType";
import { fetchPostJSON } from "@/utils/stripe/fetchPostJson";

async function generatePaymentLinks(accountId: string, uuid: string) {
  return (await fetchPostJSON(`${homeUrl}/api/affiliate/link`, {
    accountId: accountId,
    uuid: uuid,
  })) as PaymentLinkListType;
}

export default generatePaymentLinks;
