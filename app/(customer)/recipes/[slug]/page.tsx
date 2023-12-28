import React, { Suspense } from "react";
import Image from "next/image";
import { Metadata } from "next";
import homeUrl from "@/lib/constants/urls";
import dynamic from "next/dynamic";
import { NewsletterSignup } from "../../../../components/customer/recipes/NewsletterSignup";
import { notFound } from "next/navigation";
import { FeelsProgressBar } from "../../../../components/customer/recipes/FeelsProgressBar";
import api from "@/lib/apiSchema/apiSchema";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data = (await api.recipes.get({
    dynamicEndpoint: `/${params.slug!}`,
    data: { withRelated: false },
  }))!;

  if (!data?.recipe) return {};

  return {
    title: data.recipe.title.replaceAll("-", " "),
    description: data.recipe.excerpt,
    keywords: data.recipe.tags,
    publisher: "Sacbe Cacao",
    authors: {
      name: data.recipe.publisher.name,
    },
    image: data.recipe.main_image,
    alternates: {
      canonical: `${homeUrl}/recipes/${data.recipe.title.replaceAll(" ", "-")}`,
    },
    creator: "Sacbe Cacao",
    twitter: {
      card: "summary_large_image",
      description: data.recipe.excerpt,
      title: data.recipe.title.replaceAll("-", " "),
      images: data.recipe.main_image,
    },
    openGraph: {
      title: data.recipe.title.replaceAll("-", " "),
      description: data.recipe.excerpt,
      url: `${homeUrl}/recipes/${data.recipe.title.replaceAll(" ", "-")}`,
      type: "article",
      images: data.recipe.main_image,
    },
  } as Metadata;
}

async function RecipePage({
  params,
}: {
  params: { id: string; slug: string };
}) {
  const data = await api.recipes.get({
    dynamicEndpoint: `/${params.slug!}`,
    data: { withRelated: true },
  });

  if (!data) return notFound();

  const { recipe, relatedRecipes } = data;

  const MarkDown = dynamic(() =>
    import("../../../../components/customer/posts/MarkDown.1").then(
      (mod) => mod.MarkDown
    )
  );
  const PostMetaData = dynamic(() =>
    import("../../../../components/customer/posts/PostMetaData").then(
      (mod) => mod.PostMetaData
    )
  );

  const RecipeCard = dynamic(() =>
    import("../../../../components/customer/recipes/RecipeCard.1").then(
      (mod) => mod.RecipeCard
    )
  );

  return (
    <main className="w-full">
      <div className=" flex justify-center">
        <Image
          src={recipe.main_image}
          alt={`header image for ${recipe.title}`}
          width={800}
          height={300}
          className=" w-11/12 md:w-10/12 h-[500px] drop-shadow-lg rounded-lg mb-10 mt-4 object-cover "
          priority
        />
      </div>
      <h1 className="text-4xl md:text-8xl w-10/12 m-auto md:text-center">
        {recipe.title}
      </h1>
      <article className=" w-11/12 md:-10/12 lg:w-7/12 m-auto mt-20">
        {/* meta Data */}
        <div className="mt-10">
          <PostMetaData
            categories={recipe.categories}
            tags={recipe.tags}
            publisherName={recipe.publisher.name}
          />
        </div>
        {/* Intoduction */}
        <div className="mt-20">
          <h2 className="my-5">Introduction:</h2>
          <MarkDown content={recipe.introduction} />
        </div>
        {/* Feels & Instructions */}
        <div className="flex md:flex-row flex-col md:drop-shadow-xl bg-surface rounded-lg mt-20">
          <div className="md:w-1/3 w-full mt-5 rounded-lg p-2 md:p-5 ">
            <h2>Feels</h2>
            {recipe.feels.map((e: any) => {
              return (
                <div className="my-4" key={`${e.name + e.percentage}`}>
                  <p>{e.name}</p>
                  <FeelsProgressBar percentage={e.percentage} />
                </div>
              );
            })}
          </div>
          <div className="w-full md:w-2/3 md:ml-5 mt-5  drop-shadow-md">
            <h2 className="p-2">Ingredients</h2>
            <ol className=" list-disc px-10 pb-10">
              {recipe.ingredients.map((e: any) => {
                return (
                  <li
                    className=" p-2 rounded-2xl bg-tertiaryContainer hover:bg-surface my-3"
                    key={`${e.quantity} x ${e.quantityType} ${e.name}`}
                  >
                    <p className="text-onTertiaryContainer">{`${e.quantity} x ${e.quantityType} ${e.name}`}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
        <div className=" mt-28">
          <h2>Steps</h2>
          {recipe.steps.map((e: any) => {
            return (
              <div
                className="bg-surface hover:bg-tertiaryContainer hover:drop-shadow-xl  duration-300 p-5 my-5 drop-shadow-md"
                key={e.StepTitle}
              >
                <p></p>
                <div className="flex flex-col md:flex-row justify-between my-3">
                  <h3 className="">{e.StepTitle}</h3>
                  <div className="flex flex-wrap">
                    {e.ingredient &&
                      e.ingredient.map((e: any) => {
                        return (
                          <div
                            className="mx-2 rounded-full my-2 bg-tertiaryContainer self-center px-3 drop-shadow-md flex-wrap"
                            key={e}
                          >{`${e}`}</div>
                        );
                      })}
                  </div>
                </div>
                <div className="my-10">
                  <MarkDown content={e.content}></MarkDown>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-20">
          <MarkDown content={recipe.story}></MarkDown>
        </div>

        <Suspense>
          <NewsletterSignup />
        </Suspense>

        {relatedRecipes != undefined && (
          <div>
            <h4 className="mt-20">Why Not Try</h4>
            <h2>More Recipes</h2>
            {relatedRecipes.map((recipe) => {
              return <RecipeCard recipe={recipe} key={recipe.title} />;
            })}
          </div>
        )}
      </article>
    </main>
  );
}

export default RecipePage;
