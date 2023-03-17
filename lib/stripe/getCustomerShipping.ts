import Stripe from "stripe";
import { fetchGetJSON, fetchPostJSON } from "@/utils/stripe/fetchPostJson";
import ShippingModal from "@/components/modals/shipping_modal";

interface params {
  id: string;
}

export default async function getCustomerShipping({ id }: params) {
  const shipping: Stripe.Customer.Shipping = await fetchGetJSON(
    `/api/stripe/customer/address?id=${id}`
  );

  return shipping;
}
