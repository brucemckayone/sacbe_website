export interface RecipeType {
  feels: Feel[];
  featured: boolean;
  main_image: string;
  title: string;
  steps: Step[];
  cookingTime: string;
  prepTime: string;
  tags: string[];
  relatedRecipes: RelatedRecipe[];
  ingredients: Ingredient[];
  publisher: Publisher;
  categories: string[];
  excerpt: string;
  introduction: string;
  story: string;
}

export interface Feel {
  percentage: number;
  name: string;
}

export interface Ingredient {
  quantityType: string;
  quantity: string;
  name: string;
}

export interface Publisher {
  link: string;
  name: string;
}

export interface RelatedRecipe {
  _firestore: Firestore;
  _path: Path;
  _converter: Converter;
}

export interface Converter {}

export interface Firestore {
  projectId: string;
}

export interface Path {
  segments: string[];
}

export interface Step {
  StepTitle: string;
  ingredient: string[];
  content: string;
}
