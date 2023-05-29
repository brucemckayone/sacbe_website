"use client";

import { fetchGetJSON } from "@/utils/stripe/fetchPostJson";
import { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";
import { Popover } from "@mantine/core";
import Image from "next/image";
import {
  formatTitleForFetch,
  formatTitleForUrl,
} from "../posts/[title]/formatTitleForFetch";
export default function SearchBar(props: {
  toggleMenu: Dispatch<SetStateAction<boolean>>;
}) {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState("All");
  const searchFilters = ["All", "Article", "Recipes", "Pages"];
  function PopoverListItem(name: string) {
    return (
      <li>
        <button
          type="button"
          className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={() => {
            setSearchFilter(name);
          }}
        >
          {name}
        </button>
      </li>
    );
  }
  return (
    <main>
      <div>
        <div className="flex w-full md:w-8/12">
          <Popover position="top">
            <div className="w-full">
              <div className="fixed bottom-10 left-3 flex justify-center flex-row  ">
                <div>
                  <Popover.Target>
                    <button
                      id="dropdown-button"
                      data-dropdown-toggle="dropdown"
                      className="bg-surface z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center rounded-l-lg"
                      type="button"
                      onClick={() => {
                        setIsOpen(!isOpen);
                      }}
                    >
                      {searchFilter}
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 ml-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <div id="dropdown">
                      <ul
                        className="py-2 text-sm  text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdown-button"
                      >
                        {searchFilters.map((e) => {
                          return PopoverListItem(e);
                        })}
                      </ul>
                    </div>
                  </Popover.Dropdown>
                </div>
                <div className="flex  bg-surface drop-shadow-md rounded-r-full">
                  <input
                    className="w-[310px] pl-3 pb-1 text-onPrimaryContainer .placeholder-black::placeholder"
                    placeholder="What are you looking for?"
                    value={query}
                    onChange={async (e) => {
                      makeQuery(e.target.value);
                    }}
                    type="text"
                  />
                  <Image
                    src={"/icons/search_icon.svg"}
                    width={30}
                    height={30}
                    alt="search icon"
                    className="rounded-full pr-3"
                  ></Image>
                </div>
              </div>
              <div className="absolute top-[60px] left-0 w-11/12 m-3 rounded-lg drop-shadow-xl bg-surface overflow-y-auto">
                {results.length != 0 && query != "" && (
                  <div className="rounded-b-lg shadow-xl p-5 border-b border-primaryContainer">
                    {results.map((title: { title: string; type: string }) => {
                      return (
                        <div
                          key={title.title}
                          className="py-5 hover:bg-tertiaryContainer hover:shadow-sm hover:rounded-lg hover:mt-3 hover:pb-3 duration-200 px-2"
                        >
                          <Link
                            href={generateLink(title)}
                            className="no-underline group"
                            onClick={() => {
                              setResults([]);
                              props.toggleMenu(false);
                            }}
                          >
                            <div className="flex">
                              <div className="w-10/12">
                                <p>{title.title}</p>
                              </div>
                              <div
                                className={`w-2/12 p-1 h-7 drop-shadow-md rounded ml-2 group-hover:text-onSecondaryContainer ${getTypeColor(
                                  title.type
                                )}`}
                              >
                                <p className="text-center text-sm items-center">
                                  {generateResultType(
                                    title.type!
                                  ).toLocaleUpperCase()}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </Popover>
        </div>
      </div>
    </main>
  );

  function generateLink(result: { title: string; type: string }) {
    const subPath = generateSubPath(result.type);
    const path = subPath + formatTitleForUrl(result.title);
    console.log("hhehehehehehehehehreoiheorihroiher");
    console.log(path);
    return path;
  }

  function generateSubPath(type: string) {
    switch (type) {
      case "recipes":
        return "/recipes/";
      case "posts":
        return "/posts/";
      case "pages":
        return "";
    }
  }

  function getTypeColor(type: string) {
    switch (type) {
      case "recipes":
        return "bg-[#EAA55D] text-[#FFFFFF]}";
      case "posts":
        return "bg-sacbeBrandColor";
      case "pages":
        return "bg-[#5D7DEA] text-[#FFFFFF]";
      default:
        return "bg-[#fffd8f]";
    }
  }

  function generateResultType(type: string) {
    switch (type) {
      case "recipes":
        return "Recipe";
      case "posts":
        return "Article";
      case "pages":
        return "Page";
      default:
        return "Misc";
    }
  }

  async function makeQuery(searchQuery: string) {
    setQuery(searchQuery);
    setIsFetching(true);
    if (!isFetching)
      setTimeout(async () => {
        // setResults([]);
        if (searchQuery == undefined || searchQuery == "") {
          setResults([]);
        }
        if (searchQuery != "" && searchQuery != undefined) {
          const data = await fetchGetJSON(
            `/api/search/query?query=${searchQuery}&filter=${searchFilter}`
          );

          setResults(data);
          setIsFetching(false);
        }
      }, 1000);
  }
}
