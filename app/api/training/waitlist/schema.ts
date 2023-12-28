import ApiBuilderHelper, {
  HTTPMethods,
  IEndpointMethod,
} from "@/lib/apiSchema/utils/ApiBuilder";
import { affiliateStatusType, userType } from "@/types/typings";

const builder = new ApiBuilderHelper();

export const waitlistSchema = {
  post: builder.createAPIMethod<IEndpointMethod<{ email: string }>>(
    "/training/waitlist",
    HTTPMethods.POST
  ),
};
