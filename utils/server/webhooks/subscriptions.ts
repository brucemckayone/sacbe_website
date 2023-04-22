import Stripe from "stripe";
import stripe from "@/lib/stripe/stripe";
import { fetchPostJSON } from "@/utils/stripe/fetchPostJson";
import SubscriptionSender from "@/utils/email/senders/subscriptionSender";
import homeUrl from "@/lib/constants/urls";
export default class SubscriptionWebHooks {
  email = new SubscriptionSender();
  async created(subscription: Stripe.Subscription) {
    const [billingPortal, customer] = await Promise.all([
      fetchPostJSON(`${homeUrl}/api/stripe/billing/create_customer_portal`, {
        customerId: subscription.customer as string,
      }),
      stripe.customers.retrieve(subscription.customer as string),
    ]);
    const { name, email } = customer as Stripe.Customer;
    this.email.created({
      name: name!,
      email: email!,
      portalLink: billingPortal.url,
    });
  }
}
