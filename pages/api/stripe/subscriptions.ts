import stripe from "@/lib/stripe/stripe";
import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestMethod = req.method as requestMethodType;

  switch (requestMethod) {
    case "GET": {
      const status = req.query.status;
      const limit = req.query.limit as string;
      const starting_after = req.query.starting_after;
      console.log(starting_after);

      const subscriptions = await stripe.subscriptions.list({
        expand: ["data.customer", "data.latest_invoice"],
        status: status as Stripe.SubscriptionListParams.Status,
        starting_after: starting_after && (starting_after as string),
        limit: limit == null ? 5 : Number.parseInt(limit),
      });

      const productIdsList = subscriptions.data.map((e) =>
        e.items.data.map((e) => e.price.product as string)
      );
      const ids = productIdsList.flat();
      const productIds: string[] = ids.filter(function (item, pos, self) {
        return self.indexOf(item) == pos;
      });
      const products = stripe.products.list({
        ids: productIds,
      });
      const productImages = (await products).data.map((product) => {
        return {
          image: product.images[0],
          id: product.id,
        };
      });

      console.log(productImages);

      const data = [];
      for (let i = 0; i < subscriptions.data.length; i++) {
        const subData = subscriptions.data[i];

        const latestInvoice = subData.latest_invoice as Stripe.Invoice;
        const customer = subData.customer as Stripe.Customer;
        const newData = {
          id: subData.id,
          status: subData.status,
          pauseCollection: subData.pause_collection,
          latest_invoice: {
            total: latestInvoice.amount_paid,
            products: latestInvoice.lines.data.map((line) => {
              //   const product = await stripe.products.retrieve(
              //     line.price?.product as string
              //   );
              //   console.log(product.images[0]);
              const product = productImages.find((product) => {
                console.log(product.id);
                console.log(line.price?.product);
                console.log(product.id == line.price?.product);

                return product.id == line.price?.product;
              });
              return {
                image: product?.image,
                //"https://stripe-camo.global.ssl.fastly.net/2e15843740c940b52af9119d4b3eabc87d8d613f4d2acbd90b75aa631996d223/68747470733a2f2f66696c65732e7374726970652e636f6d2f6c696e6b732f4d44423859574e6a64463878545668705a4842484f445535576d5235526d317766475a735833526c6333526661446454616b78525546497961316453654670425a4446465a5745354f4745313030414c376675707979",
                name: line.description,
                cost: line.amount,
                quantity: line.quantity,
                isSubscription: line.plan != null,
              };
            }),
          },
          days_until_due: subData.days_until_due,
          date_created: subData.created,
          end_of_current_period: subData.current_period_end,
          start_of_current_period: subData.current_period_start,
          paused_collection: subData.pause_collection,
          customer: {
            name: customer.name,
            email: customer.email,
            address: customer.address,
            shipping: customer.shipping,
          },
        };
        data.push(newData);
      }

      return res
        .status(200)
        .json({ hasMore: subscriptions.has_more, data: data });
    }
    case "PATCH": {
      const { subscriptionId, updateParams } = req.body;
      console.log(subscriptionId);
      console.log(updateParams);

      const response = await stripe.subscriptions.update(
        subscriptionId,
        updateParams
      );
      return res.status(200).json(response);
    }
    case "DELETE": {
      const id = req.query.subscriptionId;

      const response = await stripe.subscriptions.del(id as string);
      return res.status(200).json(response);
    }
  }
}
