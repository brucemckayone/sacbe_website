import Stripe from "stripe";
import stripe from "@/lib/stripe/init/stripe";

// this function creates a customer if email does not exist in stripe
// if it does it fetches a customer
// if there are more than one customer with given email then new customer is created and returned
interface params {
  email?: string | undefined;
  name?: string | undefined;
}
const getOrCreateCustomer = async function ({ email, name }: params) {
  let customer: Stripe.Customer;
  if (email) {
    const customerList = await stripe.customers.list({
      email: email,
    });

    if (customerList.data.length == 1) {
      customer = customerList.data[0];
    } else {
      const createParams: Stripe.CustomerCreateParams = {
        email: email,
        name: name!,
      };
      customer = await stripe.customers.create(createParams);

      return customer;
    }
  } else {
    try {
      customer = await stripe.customers.create();

      return customer;
    } catch (e) {
      console.error(e);
    }
  }
};

export { getOrCreateCustomer };
