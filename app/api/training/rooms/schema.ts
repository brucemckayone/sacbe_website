import ApiBuilderHelper, {
  HTTPMethods,
  IEndpointMethod,
} from "@/lib/apiSchema/utils/ApiBuilder";

const builder = new ApiBuilderHelper();

export const roomsSchema = {
  get: builder.createAPIMethod<IEndpointMethod<{}>>(
    "/training/rooms",
    HTTPMethods.GET,
    undefined,
    true
  ),
};
