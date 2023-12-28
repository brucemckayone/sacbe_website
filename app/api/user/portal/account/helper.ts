import { getAccountPortalId } from "@/lib/constants/stripe/productids";
import stripe from "@/lib/stripe/init/stripe";

export const createCustomerPortal = async (params: URLSearchParams) => {
  if (!params.has("customerId"))
    return {
      status: "error",
      message:
        "Need to include customerId in get params to create an account portal",
      ok: false,
    };

  return await stripe.billingPortal.sessions.create({
    customer: params.get("customerId") as string,
    configuration: getAccountPortalId(),
  });
};
