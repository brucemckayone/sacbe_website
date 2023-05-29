// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { BlogPostsType } from "@/types/blogposts";
import adminInit from "@/utils/firebase/admin_init";
import { firestore } from "firebase-admin";
import type { NextApiRequest, NextApiResponse } from "next";
import Algolia from "@/utils/algolia/config";
import { AlgoliaBlogSearchType } from "@/types/algoliaBlogSearchType";
const algolia = new Algolia();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  adminInit();
  let query: string;
  let filter: string;
  let count: number | null | undefined;
  const db = firestore();
  const method = req.method as requestMethodType;

  switch (method) {
    case "GET": {
      query = req.query.query as string;
      filter = req.query.filter as string;
      count = req.query.count as number | undefined | null;
      const hasCount = count != null && count != undefined;

      switch (filter) {
        case "All":
          console.log("all");
          return res.status(200).json(await queryAll(query));
        case "Article":
          console.log("articles");
          return res
            .status(200)
            .json(await queryArticles(query, hasCount ? count! : 5));
        case "Recipes":
          console.log("recipes");
          return res
            .status(200)
            .json(await queryRecipes(query, hasCount ? count! : 5));
        case "Pages":
          console.log("pages");
          return res
            .status(200)
            .json(await queryPages(query, hasCount ? count! : 5));
      }
    }
  }
}

async function queryAll(query: string) {
  const blogPosts = (await algolia.articles.search(query, {
    hitsPerPage: 2,
  })) as AlgoliaBlogSearchType;

  const pages = (await algolia.pages.search(query, {
    hitsPerPage: 1,
  })) as AlgoliaBlogSearchType;

  const Recipes = (await algolia.recipes.search(query, {
    hitsPerPage: 2,
  })) as AlgoliaBlogSearchType;

  const articleReturns = blogPosts.hits.map((e) => {
    return { title: e.title, type: "posts" };
  });

  const pagesReturns = pages.hits.map((e) => {
    return { title: e.title, type: "pages" };
  });

  const recipeReturn = Recipes.hits.map((e) => {
    return { title: e.title, type: "recipes" };
  });

  return [...articleReturns, ...pagesReturns, ...recipeReturn];
}

async function queryPages(query: string, count: number = 5) {
  const data = (await algolia.pages.search(query, {
    hitsPerPage: count,
  })) as AlgoliaBlogSearchType;

  return data.hits.map((e) => {
    return { title: e.title, type: "pages" };
  });
}

async function queryRecipes(query: string, count: number = 5) {
  const data = (await algolia.recipes.search(query, {
    hitsPerPage: count,
  })) as AlgoliaBlogSearchType;

  return data.hits.map((e) => {
    return { title: e.title, type: "recipes" };
  });
}

async function queryArticles(query: string, count: number = 5) {
  const data = (await algolia.articles.search(query, {
    hitsPerPage: count,
  })) as AlgoliaBlogSearchType;

  return data.hits.map((e) => {
    return { title: e.title, type: "posts" };
  });
}
