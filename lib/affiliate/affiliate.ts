import { PaymentLinkListType } from "@/types/affiliatePaymentLinkType";
import { fetchGetJSON } from "@/utils/http/fetchGetJSON";
import { fetchPostJSON } from "@/utils/http/fetchPostJson";
import Stripe from "stripe";

type createPaymentLinkParams = {
  accountId: string;
  uuid: string;
  priceIds?: string[];
  promoShippingId?: string;
};

export class AffiliateHelper {
  private accountId: string = "";
  private email: string = "";

  async generatePaymentLinks({
    accountId,
    uuid,
    priceIds,
  }: createPaymentLinkParams) {
    return (await fetchPostJSON(`/api/affiliate/link`, {
      accountId: accountId,
      priceIds: priceIds,
      uuid: uuid,
    })) as PaymentLinkListType;
  }

  async getSales(accountId: string) {
    return (await fetchGetJSON(
      `/api/stripe/affiliate/payments?accountId=${this.accountId}`
    )) as Stripe.Response<Stripe.ApiList<Stripe.Charge>>;
  }

  async getBalance() {
    return await fetchGetJSON(
      `/api/stripe/affiliate/balance?accountId=${this.accountId}`
    );
  }
}
