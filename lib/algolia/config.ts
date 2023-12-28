import algoliasearch from "algoliasearch";
import { envConfig } from "@/lib/env/envConfig";
const client = algoliasearch(
  envConfig.ALGOLIA_ID,
  envConfig.ALGOLIA_SEARCH_SECRET
);

export default class Algolia {
  readonly articles = client.initIndex("blog posts");
  readonly pages = client.initIndex("pages");
  readonly recipes = client.initIndex("recipes");
}
