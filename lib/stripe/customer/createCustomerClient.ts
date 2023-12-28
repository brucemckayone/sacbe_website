import Stripe from "stripe";
import { fetchPostJSON } from "@/utils/http/fetchPostJson";

interface params {
  email: string;
  name: string | undefined | null;
}

export default async function createCustomerClient({ email, name }: params) {
  const customer: Stripe.Customer = await fetchPostJSON(
    "/api/stripe/client/create_customer/create_customer",
    {
      email: email,
      name: name,
    }
  );

  return customer;
}
