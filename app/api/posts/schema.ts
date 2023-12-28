import ApiBuilderHelper, {
  HTTPMethods,
  IDynamicEndpointMethod,
} from "@/lib/apiSchema/utils/ApiBuilder";
import { BlogPostType } from "@/types/blogPost";

interface RecipeGetParams {
  withRelated: boolean;
}

type PostGetReturnType = {
  status:
    | {
        post: string | undefined;
        related: string | undefined;
      }
    | undefined
    | string;
  message:
    | {
        post: string;
        related: string;
      }
    | string
    | undefined;
  post: BlogPostType;
  relatedPost: BlogPostType[];
  error: any;
};

const builder = new ApiBuilderHelper();

// Define the actual API
const postApiSchema = {
  get: builder.createAPIMethod<
    IDynamicEndpointMethod<RecipeGetParams>,
    PostGetReturnType
  >("/posts", HTTPMethods.GET),
};

export default postApiSchema;
