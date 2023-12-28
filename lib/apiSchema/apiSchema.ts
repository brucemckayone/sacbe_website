import affiliateApiSchema from "@/app/api/affiliates/schema";
import mailingAPISchmea from "@/app/api/mailing/schema";
import postApiSchema from "@/app/api/posts/schema";
import recipeApiSchema from "@/app/api/recipes/schema";
import stripeAPISchema from "@/app/api/stripe/schema";
import { trainingSchema } from "@/app/api/training/schema";
import userApiSchema from "@/app/api/user/schema";

const api = {
  user: userApiSchema,
  recipes: recipeApiSchema,
  posts: postApiSchema,
  affiliate: affiliateApiSchema,
  mailing: mailingAPISchmea,
  stripe: stripeAPISchema,
  training: trainingSchema,
};

export default api;
