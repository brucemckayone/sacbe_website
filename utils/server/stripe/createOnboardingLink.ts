import { fetchGetJSON } from "@/utils/stripe/fetchPostJson";
import Stripe from "stripe";

async function createOnBoardingLink(accountId: string) {
  const acountLink: Stripe.AccountLink = await fetchGetJSON(
    `/api/stripe/affiliate/links/onboarding?accountId=${accountId}`
  );
  return acountLink;
}

export default createOnBoardingLink;
