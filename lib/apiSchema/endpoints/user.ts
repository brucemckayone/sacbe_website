import ApiBuilderHelper, {
  HTTPMethods,
  IDynamicEndpointMethod,
} from "../utils/ApiBuilder";
const builder = new ApiBuilderHelper();

// Define the actual API
export let userApi = {
  get: builder.createAPIMethod<{ id: string }>("/user", HTTPMethods.GET),
  delete: builder.createAPIMethod<{ id: string }>("/user", HTTPMethods.DELETE),
  post: builder.createAPIMethod<{ id: string }>("/user", HTTPMethods.POST),
  patch: builder.createAPIMethod<{ id: string }>("/user", HTTPMethods.PATCH),
  put: builder.createAPIMethod<{ id: string }>("/user", HTTPMethods.PUT),
  id: {
    get: builder.createAPIMethod<IDynamicEndpointMethod<{ id: string }>>(
      "/user",
      HTTPMethods.GET
    ),
    delete: builder.createAPIMethod<IDynamicEndpointMethod<{ id: string }>>(
      "/user",
      HTTPMethods.DELETE
    ),
    post: builder.createAPIMethod<IDynamicEndpointMethod<{ id: string }>>(
      "input",
      HTTPMethods.POST
    ),
    patch: builder.createAPIMethod<IDynamicEndpointMethod<{ id: string }>>(
      "input",
      HTTPMethods.PATCH
    ),
    put: builder.createAPIMethod<IDynamicEndpointMethod<{ id: string }>>(
      "input",
      HTTPMethods.PUT
    ),
  },
};
