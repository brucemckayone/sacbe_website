import ApiBuilderHelper, {
  HTTPMethods,
  IEndpointMethod,
} from "@/lib/apiSchema/utils/ApiBuilder";

import { AtLeastOne } from "@/types/typings";
import { APIResponse } from "../types";
import { ICouponGetParams, ICouponPostBody } from "./coupon/types";
import { IAffiliatePaymentGetParams } from "./payments/types";
import {
  IRequestGetBody,
  IRequestPatchBody,
  IRequestPostBody,
} from "./request/types";
import {
  IPaymentLinkGetParams,
  IPaymentLinkPostBody,
  PaymentLinkGetResponseType,
} from "./setup/paymentLinks/types";
import { ISetupGetParams } from "./setup/types";

const builder = new ApiBuilderHelper();

// Define the actual API
const affiliateApiSchema = {
  coupon: {
    get: builder.createAPIMethod<IEndpointMethod<AtLeastOne<ICouponGetParams>>>(
      "/affiliates/coupon",
      HTTPMethods.GET
    ),
    post: builder.createAPIMethod<IEndpointMethod<ICouponPostBody>>(
      "/affiliates/coupon",
      HTTPMethods.POST
    ),
    validate: {
      get: builder.createAPIMethod<IEndpointMethod<{ couponName: string }>>(
        "/affiliates/coupon/validate",
        HTTPMethods.GET
      ),
    },
  },
  payout: {
    get: builder.createAPIMethod<
      IEndpointMethod<AtLeastOne<{ accountId: string }>>
    >("/affiliates/payout", HTTPMethods.GET),
  },

  request: {
    get: builder.createAPIMethod<IEndpointMethod<AtLeastOne<IRequestGetBody>>>(
      "/affiliates/request",
      HTTPMethods.GET
    ),
    post: builder.createAPIMethod<IEndpointMethod<IRequestPostBody>>(
      "/affiliates/request",
      HTTPMethods.POST
    ),
    patch: builder.createAPIMethod<IEndpointMethod<IRequestPatchBody>>(
      "/affiliates/request",
      HTTPMethods.PATCH
    ),
  },
  setup: {
    get: builder.createAPIMethod<
      IEndpointMethod<ISetupGetParams>,
      APIResponse<any>
    >("/affiliates/setup", HTTPMethods.GET),
    paymentLinks: {
      get: builder.createAPIMethod<
        IEndpointMethod<IPaymentLinkGetParams>,
        PaymentLinkGetResponseType
      >("/affiliates/setup/paymentLinks", HTTPMethods.GET),
      post: builder.createAPIMethod<IEndpointMethod<IPaymentLinkPostBody>>(
        "/affiliates/setup/paymentLinks",
        HTTPMethods.POST
      ),
      delete: builder.createAPIMethod<IEndpointMethod<IPaymentLinkGetParams>>(
        "/affiliates/setup/paymentLinks",
        HTTPMethods.DELETE
      ),
    },
  },
  payments: {
    get: builder.createAPIMethod<IEndpointMethod<{ accountId: string }>>(
      "/affiliates/payments",
      HTTPMethods.GET
    ),
  },
  balance: {
    get: builder.createAPIMethod<IEndpointMethod<{ accountId: string }>>(
      "/affiliates/balance",
      HTTPMethods.GET
    ),
  },
  profile: {},
};

export default affiliateApiSchema;
