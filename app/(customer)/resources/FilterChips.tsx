"use client";
import React, { useState } from "react";

export function FilterChips() {
  const [filter, setFilter] = useState("All");
  return (
    <div
      className={`flex justify-between bg-tertiaryContainer w-10/12 m-auto rounded-full my-10 p-1`}
    >
      <div
        onClick={() => {
          setFilter("All");
        }}
        className={`rounded-full py-2 px-10  duration-300 ${
          filter == "All" ? "bg-surface drop-shadow-md" : "bg-tertiaryContainer"
        }  `}
      >
        <p>All</p>
      </div>
      <div
        onClick={() => {
          setFilter("Recipes");
        }}
        className={`rounded-full py-2 px-10  duration-300 ${
          filter == "Recipes"
            ? "bg-surface drop-shadow-md"
            : "bg-tertiaryContainer"
        } `}
      >
        <p> Recipes</p>
      </div>
      <div
        onClick={() => {
          setFilter("Articles");
        }}
        className={`rounded-full py-2 px-10  duration-300 ${
          filter == "Articles"
            ? "bg-surface drop-shadow-md"
            : "bg-tertiaryContainer"
        }`}
      >
        <p> Articles</p>
      </div>
    </div>
  );
}
