import Stripe from "stripe";

export interface IPostBody {
  email: string;
  name?: string;
  phoneNumber?: string;
  address?: Stripe.Address;
  tags?: string[];
}
