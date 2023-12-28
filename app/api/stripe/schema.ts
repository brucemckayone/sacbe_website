import ApiBuilderHelper, {
  HTTPMethods,
  IEndpointMethod,
} from "@/lib/apiSchema/utils/ApiBuilder";

import {
  ICreateCheckoutParams,
  IGETCreateCustomCheckoutParams,
  IPOSTCreateCheckoutParams,
} from "./checkout/helper";

const builder = new ApiBuilderHelper();
// Define the actual API
const stripeAPISchema = {
  billing: {},
  checkout: {
    get: builder.createAPIMethod<IEndpointMethod<ICreateCheckoutParams>>(
      "/stripe/checkout",
      HTTPMethods.GET
    ),
    post: builder.createAPIMethod<IEndpointMethod<IPOSTCreateCheckoutParams>>(
      "/stripe/checkout",
      HTTPMethods.POST
    ),
    custom: {
      post: builder.createAPIMethod<
        IEndpointMethod<IGETCreateCustomCheckoutParams>
      >("/stripe/checkout/custom", HTTPMethods.POST),
    },
  },
};

export default stripeAPISchema;
