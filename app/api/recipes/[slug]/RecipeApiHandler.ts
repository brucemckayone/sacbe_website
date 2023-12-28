import CollectionHelper from "@/utils/firebase/collectionHelper";

export default class RecipeApiHelper {
  col: CollectionHelper;
  constructor(db: FirebaseFirestore.Firestore) {
    this.col = new CollectionHelper(db.collection("recipes"));
  }

  async getBySlug(slug: string, withRelated: boolean = true) {
    const recipe = await this.col.getDoc(slug);

    if (withRelated && recipe.data?.relatedRecipe) {
      const related = await this.col.getByDocReference(
        recipe.data!.relatedRecipe
      );
      return {
        status: {
          recipe: recipe.status,
          related: related.status,
        },
        message: {
          recipe: "fetch recipe with no related recipes",
          related: related.message,
        },
        recipe: recipe.data,
        relatedRecipe: related.data,
      };
    } else {
      return {
        status: "Success",
        message: "fetch recipe with no related recipes",
        recipe: recipe.data,
        relatedRecipe: [],
      };
    }
  }
}
