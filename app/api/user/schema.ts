import ApiBuilderHelper, {
  HTTPMethods,
  IEndpointMethod,
} from "@/lib/apiSchema/utils/ApiBuilder";
import { affiliateStatusType, userType } from "@/types/typings";
import { APIResponse } from "../types";
interface UserGetParams {
  uuid?: string;
  email?: string;
  customerId?: string;
}

interface UserPatchBody {
  updates: {
    affiliateStatus?: affiliateStatusType;
    chargesEnabled?: boolean;
    wholesale?: boolean;
    name?: string;
    customerId?: string;
    coupon?: string;
  };
  uuid: string;
}

interface UserDeleteParams {
  uuid?: string;
  customerId?: string;
  email?: string;
}

const builder = new ApiBuilderHelper();

// Define the actual API
const userApiSchema = {
  get: builder.createAPIMethod<
    IEndpointMethod<UserGetParams>,
    APIResponse<userType>
  >("/user", HTTPMethods.GET),

  patch: builder.createAPIMethod<IEndpointMethod<UserPatchBody>>(
    "/user",
    HTTPMethods.PATCH
  ),
  delete: builder.createAPIMethod<IEndpointMethod<UserDeleteParams>>(
    "/user",
    HTTPMethods.DELETE
  ),
  portal: {
    subscription: {
      get: builder.createAPIMethod<IEndpointMethod<{ customerId: string }>>(
        "/user/portal/subscription",
        HTTPMethods.GET
      ),
    },
    account: {
      get: builder.createAPIMethod<IEndpointMethod<{ customerId: string }>>(
        "/user/portal/account",
        HTTPMethods.GET
      ),
    },
  },
};

export default userApiSchema;
