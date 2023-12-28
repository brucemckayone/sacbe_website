import ApiBuilderHelper, {
  HTTPMethods,
  IDynamicEndpointMethod,
} from "@/lib/apiSchema/utils/ApiBuilder";
import { RecipeType } from "@/types/recipieType";

interface RecipeGetParams {
  withRelated: boolean;
}

type RecipeGetReturnType = {
  status:
    | {
        recipe: string | undefined;
        related: string | undefined;
      }
    | undefined
    | string;
  message:
    | {
        recipe: string;
        related: string;
      }
    | string
    | undefined;
  recipe: RecipeType;
  relatedRecipes: RecipeType[];
  error: any;
};

const builder = new ApiBuilderHelper();

// Define the actual API
const recipeApiSchema = {
  get: builder.createAPIMethod<
    IDynamicEndpointMethod<RecipeGetParams>,
    RecipeGetReturnType
  >("/recipes", HTTPMethods.GET),
};

export default recipeApiSchema;
