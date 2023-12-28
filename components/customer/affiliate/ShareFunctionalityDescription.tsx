"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import dollarIcon from "@/public/icons/dollar_icon.svg";
import { BlogPostType } from "@/types/blogPost";
import { RecipeType } from "@/types/recipieType";
import { BlogPostSuggestionCard } from "../posts/BlogPostSuggestionCard";
import { RecipeCard } from "../recipes/RecipeCard";

export default function ShareFunctionalityDescription() {
  const [posts, setPosts] = useState<BlogPostType[] | undefined>(undefined);
  const [recipes, setRecipes] = useState<RecipeType[] | undefined>(undefined);

  const fetchData = async () => {
    const resp = await fetch("/api/resources");
    const json = await resp.json();
    setPosts(json.posts as BlogPostType[]);
    setRecipes(json.recipes as RecipeType[]);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const postCards = posts?.map((e) => {
    return <BlogPostSuggestionCard post={e} key={e.title} />;
  });

  const recipeCards = recipes?.map((e) => {
    return <RecipeCard recipe={e} key={e.title} />;
  });

  const Cards = postCards?.flatMap((e, idx) => [
    e,
    (recipeCards && recipeCards[idx]) ?? [],
  ]);

  return (
    <div>
      <h2 className="mt-10">Share Specially Designed Media</h2>
      <div className="mt-10 flex flex-wrap ">
        <div className=" w-11/12 ">
          <span className="inline-flex">
            <p>
              Copy the link to these specially designed target media, or look
              for the
              <Image
                src={dollarIcon}
                alt="dollar icon for affiliate links"
                height={20}
                width={20}
                className="bg-sacbeBrandColor w-10 h-10 drop-shadow-lg rounded-full p-2 mx-3 inline-block "
              />
              at the bottom of any page, recipe or article on our website to
              copy a link with your affiliate link already attached! Its that
              simple!
            </p>
          </span>
        </div>
      </div>
      <div className="w-11/12 lg:w-7/12 m-auto">{Cards}</div>
    </div>
  );
}
