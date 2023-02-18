import { NextApiRequest, NextApiResponse } from "next";
import { envConfig } from "@/lib/webhooks/envConfig";
import Stripe from "stripe";
import { emit } from "process";

// that creates a customer
// if an email is provided it searches database for customer with that email and returns customer object
// if email is not in database a customer is created with that email
// if no email provided customer is created and returned

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const stripe = new Stripe(envConfig.STRIPE_SECRET, {
    apiVersion: "2022-11-15",
  });
  const email: string | undefined = req.body.email;
  const name: string | undefined | null = req.body.name;
  if (req.body.name == null) {
    req.body.name = "undefined";
  }

  if (email) {
    console.log(`email provided: ${email}`);
    const customerList = await stripe.customers.list({
      email: email,
    });
    console.log(`${customerList.data.length} existing customer: ${email}`);
    if (customerList.data.length == 1) {
      const customer = customerList.data[0];
      res.status(200).json(customer);
    } else {
      const createParams: Stripe.CustomerCreateParams = {
        email: email,
        name: name!,
      };
      const customer = await stripe.customers.create(createParams);
      console.log(`New Customer Created`);
      res.status(200).json(customer);
    }
  } else {
    console.log(`Is new customer`);
    try {
      const customer = await stripe.customers.create();
      console.log(`New Customer Created`);
      res.status(200).json(customer);
    } catch (e) {
      console.log(`could not create new customer`);
      res.status(401).json({
        status: 200,
        message: `There was an issue creating a customer`,
      });
    }
  }
}
