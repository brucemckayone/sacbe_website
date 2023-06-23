import { NextRequest, NextResponse } from 'next/server'
import { firestore } from 'firebase-admin';
import adminInit from '@/utils/firebase/admin_init';
import { formatTitleForFetch } from '@/utils/url/formater';
import { DocumentReference } from 'firebase/firestore';

export async function GET(request: NextRequest) {
  console.log(request.nextUrl.pathname.split('/').pop()!);
  
    try {
      const snap = await getRecipe(request.nextUrl.pathname.split('/').pop()!);
      const recipe = snap.data() as any;
      if (!snap.exists) 
        return NextResponse.json({ recipe: {}, relatedRecipes: [] });

        const relatedRecipes = await getRelatedRecipes(recipe.relatedRecipes);
        return NextResponse.json({ recipe: recipe, relatedRecipes: relatedRecipes });
    } catch (e) {
        console.error(e);
        return NextResponse.error();
    }
}

async function getRecipe(slug: string) {
  adminInit();
  const db = firestore();  
  return  await db
    .collection("recipes")
    .doc(slug)
    .get();
}

async function getRelatedRecipes(relatedRecipes: DocumentReference[]) {
  adminInit();
  const db = firestore();
  const snapshot = await db
    .collection("recipes")
    .where(
      firestore.FieldPath.documentId(),
      "in",
      relatedRecipes.map((e) => e.id)
    )
    .get();
  return snapshot.docs.map((e) => e.data());
}