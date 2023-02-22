import Stripe from "stripe";
import { envConfig } from "@/lib/webhooks/envConfig";

// this function creates a customer if email does not exist in stripe
// if it does it fetches a customer
// if there are more than one customer with given email then new customer is created and returned
interface params {
  email?: string | undefined;
  name?: string | undefined;
}
const getOrCreateCustomer = async function ({ email, name }: params) {
  const stripe = new Stripe(envConfig.STRIPE_SECRET, {
    apiVersion: "2022-11-15",
  });
  let customer: Stripe.Customer;
  if (email) {
    console.log(`email provided: ${email}`);
    const customerList = await stripe.customers.list({
      email: email,
    });
    console.log(`${customerList.data.length} existing customer: ${email}`);
    if (customerList.data.length == 1) {
      customer = customerList.data[0];
    } else {
      const createParams: Stripe.CustomerCreateParams = {
        email: email,
        name: name!,
      };
      customer = await stripe.customers.create(createParams);
      console.log(`New Customer Created`);
      return customer;
    }
  } else {
    console.log(`Is new customer`);
    try {
      customer = await stripe.customers.create();
      console.log(`New Customer Created`);
      return customer;
    } catch (e) {
      console.log(`could not create new customer`);
    }
  }
};

export { getOrCreateCustomer };
