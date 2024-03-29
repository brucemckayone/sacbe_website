import ApiBuilderHelper, {
  HTTPMethods,
  IEndpointMethod,
} from "@/lib/apiSchema/utils/ApiBuilder";

const builder = new ApiBuilderHelper();

export const waitlistSchema = {
  post: builder.createAPIMethod<IEndpointMethod<{ email: string }>>(
    "/training/waitlist",
    HTTPMethods.POST
  ),
};
