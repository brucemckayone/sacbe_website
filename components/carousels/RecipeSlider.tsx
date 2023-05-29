"use client";
import { blogPostType } from "@/app/(customer)/posts/[title]/page";
import { BlogPostsType } from "@/types/blogposts";
import { RecipeType } from "@/types/recipieType";
import { Carousel } from "@mantine/carousel";
import React from "react";

function RecipeSlider(props: { a: blogPostType }) {
  return (
    <div>
      <Carousel>
        <Carousel.Slide>
          <div>{props.a.title}</div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div>{props.a.title}</div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div>{props.a.title}</div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div>{props.a.title}</div>
        </Carousel.Slide>
      </Carousel>
    </div>
  );
}

export default RecipeSlider;
