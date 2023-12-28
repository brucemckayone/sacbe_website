import Stripe from "stripe";
import { envConfig } from "@/lib/env/envConfig";
import testSwitch from "@/utils/test/TestSwitch";

const stripe = new Stripe(
  testSwitch<string>({
    live: envConfig.STRIPE_SECRET,
    test: "sk_test_51MXidpG859ZdyFmpVjbfa4cmXB4LxCbAOmGF2miuQhwYnPdvYKqKg7eojkplvixcd5tvQZTGShPwffzyzbILhoMZ00y45NdkRS",
  }),

  {
    apiVersion: "2023-10-16",
  }
);

export default stripe;
