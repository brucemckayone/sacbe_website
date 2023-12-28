import testSwitch from "@/utils/test/TestSwitch";
import Stripe from "stripe";

const firstClassShippingPriceIdLive = "price_1NLYCTG859ZdyFmpJCrCATal";
const firstClassShippingPriceIdTest = "price_1NIsjZG859ZdyFmpvMG66qkf";
const secondClassShippingPriceIdLive = "price_1NLYCaG859ZdyFmprZcXvCYg";
const secondClassShippingPriceIdTest = "price_1NIsiYG859ZdyFmpLEjRmAAZ";

const sacbeOneTimePriceLive = "price_1NLYCcG859ZdyFmpgkHOXIUZ";
const sacbeOneTimePriceTest = "price_1NIqy6G859ZdyFmpEbQLnA5q";

const sacbeSubPriceLive = "price_1NLYCcG859ZdyFmpa95GIeSb";
const sacbeSubPriceTest = "price_1NIqy6G859ZdyFmpzaNNkSNu";

const sacbeProductIdLive = "prod_O510s671X0JDYq";
const sacbeProductIdTest = "prod_O7noF65HmL4yI7";

const firstClassShippingRateLive = "shr_1NLYCrG859ZdyFmp11reCjT7";
const firstClassShippingRateTest = "shr_1NJkibG859ZdyFmpn31XJnFC";

const secondClassShippingRateLive = "shr_1NLYCuG859ZdyFmpLUaJkA6R";
const secondClassShippingRateTest = "shr_1NIr2PG859ZdyFmpt5qaCSej";

const accountPortalIdLive = "bpc_1OIHO1G859ZdyFmpts3JZMQZ";
const subPortalIdTest = "bpc_1OIHQvG859ZdyFmpKZ6dax0p";

const subPortalIdLive = "bpc_1OIHO1G859ZdyFmpPjYBvE9j";
const accountPortalIdTest = "bpc_1OIHQvG859ZdyFmpsnTxstRy";

export const getFirstClassSubscriptionId = () =>
  testSwitch<string[]>({
    live: [sacbeSubPriceLive, firstClassShippingPriceIdLive],
    test: [sacbeSubPriceTest, firstClassShippingPriceIdTest],
  });

export const getSecondClassSubscriptionId = () =>
  testSwitch<string[]>({
    live: [sacbeSubPriceLive, secondClassShippingPriceIdLive],
    test: [sacbeSubPriceTest, secondClassShippingPriceIdTest],
  });

export const getSubAndOneTimeId = () =>
  testSwitch<string[]>({
    live: [sacbeSubPriceLive, sacbeOneTimePriceLive],
    test: [sacbeSubPriceTest, sacbeOneTimePriceTest],
  });

export const getOneTimeId = (asString?: boolean) => {
  if (asString) {
    return testSwitch<string>({
      live: sacbeOneTimePriceLive,
      test: sacbeOneTimePriceTest,
    });
  } else {
    return testSwitch<string[]>({
      live: [sacbeOneTimePriceLive],
      test: [sacbeOneTimePriceTest],
    });
  }
};

export const getSacbeProductId = () =>
  testSwitch<string[]>({
    test: [sacbeProductIdLive],
    live: [sacbeProductIdTest],
  });

export const getShippingRates = () =>
  testSwitch<Stripe.PaymentLinkCreateParams.ShippingOption[]>({
    live: [
      {
        shipping_rate: firstClassShippingRateLive,
      },
      {
        shipping_rate: secondClassShippingRateLive,
      },
    ],
    test: [
      {
        shipping_rate: firstClassShippingRateTest,
      },
      {
        shipping_rate: secondClassShippingRateTest,
      },
    ],
  });

export const getAccountPortalId = () =>
  testSwitch<string>({
    live: accountPortalIdLive,
    test: accountPortalIdTest,
  });

export const getSubscriptionPortalId = () =>
  testSwitch<string>({
    live: subPortalIdLive,
    test: subPortalIdTest,
  });
