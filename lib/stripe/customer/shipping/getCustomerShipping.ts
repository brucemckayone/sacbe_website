import Stripe from "stripe";
import { fetchPostJSON } from "@/utils/http/fetchPostJson";
import { fetchGetJSON } from "@/utils/http/fetchGetJSON";
import ShippingModal from "@/components/shared/modals/shipping_modal";

interface params {
  id: string;
}

export default async function getCustomerShipping({ id }: params) {
  const shipping: Stripe.Customer.Shipping = await fetchGetJSON(
    `/api/stripe/customer/address?id=${id}`
  );

  return shipping;
}
