import Stripe from "stripe";
import { envConfig } from "@/lib/webhooks/envConfig";
import testSwitch from "@/utils/test/TestSwitch";

const stripe = new Stripe(
  testSwitch({
    live: envConfig.STRIPE_SECRET,
    test: "sk_test_51MXidpG859ZdyFmpVjbfa4cmXB4LxCbAOmGF2miuQhwYnPdvYKqKg7eojkplvixcd5tvQZTGShPwffzyzbILhoMZ00y45NdkRS",
  }),
  
  {
  apiVersion: "2022-11-15",
});

export default stripe;
