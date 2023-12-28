import ApiBuilderHelper, {
  HTTPMethods,
  IDynamicEndpointMethod,
  IEndpointMethod,
} from "@/lib/apiSchema/utils/ApiBuilder";
import { APIResponse } from "../types";
import { IPostBody } from "./signup/types";

const builder = new ApiBuilderHelper();

// Define the actual API
const mailingAPISchmea = {
  email: {},
  signUp: {
    post: builder.createAPIMethod<IEndpointMethod<IPostBody>, APIResponse<any>>(
      "/mailing/signup",
      HTTPMethods.POST
    ),
  },
};

export default mailingAPISchmea;
