"use client";
import "../../app/globals.css";
import Hamburger from "hamburger-react";
import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "../buttons/primaryButton";
import { useState } from "react";
export default function Navbar(props: any) {
  const [isDrawerOpen, setDrawerOpenState] = useState(false);
  function toggleDrawer() {
    setDrawerOpenState(!isDrawerOpen);
  }

  return (
    <header className="sticky top-0 z-50 flex flex-row justify-between border-b-4 border-t-4 border-onSurface align-baseline bg-onPrimary">
      <div className="flex mt-3">
        <Hamburger
          toggled={isDrawerOpen}
          onToggle={() => {
            toggleDrawer();
          }}
        ></Hamburger>
      </div>
      <Link className="flex" href="/">
        <Image src="/logo.svg" alt="logo" width={300} height={80}></Image>
      </Link>
      <div className="m-1">
        <PrimaryButton
          text="LOGIN"
          url="https://billing.stripe.com/p/login/test_dR629SgVlcYOdri000"
        ></PrimaryButton>
      </div>
      {
        <div
          className={`absolute top-0 bottom-0 right-0 left-0 ${
            isDrawerOpen
              ? "animate-slide_in_left_fade "
              : "animate-slide_out_left_fade hidden"
          } `}
        >
          <div className=" w-full md:w-1/3 bg-sacbeBrandColor h-screen border-r-2 ">
            <div
              className="relative text-end"
              onClick={() => {
                toggleDrawer();
              }}
            >
              <p>close</p>
            </div>
            <div className="ml-10  ">
              <Link href={""}>
                <h1 className="my-10 hover:text-[white] duration-300">HOME</h1>
              </Link>
              <Link href={""}>
                <h1 className="my-10 hover:text-[white] duration-300">
                  EVENTS
                </h1>
              </Link>
              <Link href={""}>
                <h1 className="my-10 hover:text-[white] duration-300">ABOUT</h1>
              </Link>
              <Link href={""}>
                <h1 className="my-10 hover:text-[white] duration-300">
                  RECIPES
                </h1>
              </Link>
              <Link href={""}>
                <h1 className="my-10 hover:text-[white] duration-300">
                  AFFILIATES
                </h1>
              </Link>
            </div>
          </div>
          <div
            className="w-2/3"
            onClick={() => setDrawerOpenState(!isDrawerOpen)}
          ></div>
        </div>
      }
    </header>
  );
}
