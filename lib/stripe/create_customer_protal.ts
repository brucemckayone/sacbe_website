import stripe from "./stripe";

interface params {
  customerId: string;
}

const createCustomerPortal = async ({ customerId }: params) => {
  const configuration = await stripe.billingPortal.configurations.list();
  console.log(configuration);

  console.log(configuration.data[0].id);
  return await stripe.billingPortal.sessions.create({
    customer: customerId,
    configuration: configuration.data[0].id,
  });
};
export default createCustomerPortal;
