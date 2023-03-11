import homeUrl from "@/lib/constants/urls";
import { fetchPostJSON } from "@/utils/stripe/fetchPostJson";
import { firestore } from "firebase-admin";
import stripe from "@/lib/stripe/stripe";
import Stripe from "stripe";

type createPaymentLinkParams = {
  accountId: string;
  uuid: string;
  priceIds?: string[];
  promoShippingId?: string;
};

async function createProductLink({
  accountId,
  uuid,
  priceIds,
}: createPaymentLinkParams) {
  const createLink = fetchPostJSON(`${homeUrl}/api/affiliate/link`, {
    accountId: accountId,
    uuid: uuid,
    priceIds: priceIds,
  } as createPaymentLinkParams);
  return createLink;
}

export default createProductLink;
