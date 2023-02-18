import Stripe from "stripe";
import { fetchPostJSON } from "@/utils/stripe/fetchPostJson";

interface params {
  email: string;
  name: string | undefined | null;
  returnOnlyId: boolean;
}

export default async function createCustomer({
  email,
  name,
  returnOnlyId = false,
}: params) {
  const customer: Stripe.Customer = await fetchPostJSON(
    "/api/stripe/client/create_customer",
    {
      email: email,
      name: name,
    }
  ).catch((error) => {
    console.error(error);
  });

  if (returnOnlyId) {
    return customer.id;
  }
  return customer;
}
