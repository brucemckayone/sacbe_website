import { fetchPostJSON, fetchUpdateJSON } from "@/utils/stripe/fetchPostJson";

import Stripe from "stripe";
interface updateStripeCustomerShippingInterface {
  address: Stripe.Address;
  id: String;
  name: String;
}
async function updateStripeCustomerShipping({
  address,
  id,
  name,
}: updateStripeCustomerShippingInterface) {
  const response = await fetchUpdateJSON("/api/stripe/customer/address", {
    address: address,
    id: id,
    name: name,
  });
  console.log(response);
  return response;
}

export default updateStripeCustomerShipping;
