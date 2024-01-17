"use client";
import Hamburger from "hamburger-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import menuItems from "@/lib/constants/menu";
import LoginButton from "../buttons/loginButton";
import { EarlyBirdCountdownTimer } from "@/app/(customer)/facilitator-training/AccomidationChoiceCard";
import JoinWaitlistButton from "@/app/(customer)/facilitator-training/JoinWaitlistButton";
import { isAfterJan3rd530 } from "@/app/(customer)/facilitator-training/bookingSelection";
import SessionProvider from "@/components/providers/SessionProvider";

export default function Navbar() {
  // const SearchBar = dynamic(() =>
  //   import("../search/searchbar").then((res) => res.default)
  // );

  return (
    <SessionProvider>
      <div>
        <header className=" sticky top-0 z-50 flex flex-row  h-16 justify-between border-b-4 border-t-4 border-onSurface align-baseline bg-surface  ">
          <Menu />
          <Link className="flex md:ml-20" href="/">
            <Image
              src="/logo.svg"
              alt="logo"
              width={300}
              height={50}
              priority
              className="w-9/12 md:pl-5 md:w-1/5 m-auto"
            />
          </Link>
          <LoginButton />
        </header>
        {/* <div className="w-full bg-errorContainer text-onError relative z-50">
          <p className="pl-2 text-onErrorContainer text-ellipsis text-xs md:text-lg  ">
            Order no later than Dec 12th for guaranteed Solstice delievery + 19th
            for Christmas.
          </p>
        </div> */}
      </div>
    </SessionProvider>
  );

  function Menu() {
    const [isDrawerOpen, setDrawerOpenState] = useState(false);
    function toggleDrawer() {
      setDrawerOpenState(!isDrawerOpen);
    }
    return (
      <div className="flex m-1 ">
        <div className="w-full ml-a">
          <Hamburger
            toggled={isDrawerOpen}
            onToggle={() => {
              toggleDrawer();
            }}
          />
        </div>

        <div
          className={`fixed top-0 bottom-0 right-0 left-0 ${
            isDrawerOpen
              ? "animate-slide_in_left_fade "
              : "animate-slide_out_left_fade hidden"
          } `}
        >
          <div className="w-full md:w-1/3 bg-sacbeBrandColor h-screen border-r-2 ">
            <div className="flex justify-end rounded-lg">
              <div
                className="bg-surface drop-shadow-lg rounded-full  m-3 opacity-80"
                aria-labelledby="open-menu"
                role="menu"
              >
                <Hamburger
                  toggled={isDrawerOpen}
                  onToggle={() => {
                    toggleDrawer();
                  }}
                  label="Show menu"
                />
              </div>
            </div>
            <div className="ml-10 ">
              {menuItems.map((item) => {
                return (
                  <>
                    <Link
                      onClick={() => {
                        toggleDrawer();
                      }}
                      key={`drawerMenu ${item.link}+${item.text}`}
                      href={item.link}
                      className="no-underline group"
                    >
                      <h2 className="mt-10 underline group-hover:text-[white] duration-300">
                        {item.text}
                      </h2>
                      <h4 className="no-underline text-xl group-hover:text-onPrimary">
                        {item.subTitle}
                      </h4>
                    </Link>
                    {item.text == "Training" && (
                      <div className="w-11/12 md:w-6/12 mt-4">
                        <EarlyBirdCountdownTimer isDark={false} />
                        <div className="mt-2">
                          {!isAfterJan3rd530() && <JoinWaitlistButton />}
                        </div>
                      </div>
                    )}
                  </>
                );
              })}
            </div>
          </div>
          <div
            className="w-2/3"
            onClick={() => setDrawerOpenState(!isDrawerOpen)}
          ></div>
        </div>
      </div>
    );
  }
}
