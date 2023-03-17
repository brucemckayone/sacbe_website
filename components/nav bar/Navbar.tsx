"use client";
import "../../app/globals.css";
import Hamburger from "hamburger-react";
import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "../buttons/primaryButton";
import { useState } from "react";
import LoginButton from "../buttons/loginButton";
import { signOut } from "next-auth/react";
import menuItems from "@/lib/constants/menu";

export default function Navbar(props: any) {
  return (
    <header className="sticky top-0 z-50 flex flex-row  justify-between border-b-4 border-t-4 border-onSurface align-baseline bg-onPrimary">
      <Menu />
      <Link className="flex" href="/">
        <Image
          src="/logo.svg"
          alt="logo"
          width={300}
          height={80}
          priority
        ></Image>
      </Link>
      <LoginButton></LoginButton>
    </header>
  );
}

function Menu() {
  const [isDrawerOpen, setDrawerOpenState] = useState(false);
  function toggleDrawer() {
    setDrawerOpenState(!isDrawerOpen);
  }
  return (
    <div className="flex mt-3">
      <Hamburger
        toggled={isDrawerOpen}
        onToggle={() => {
          toggleDrawer();
        }}
      ></Hamburger>
      {
        <div
          className={`absolute top-0 bottom-0 right-0 left-0 ${
            isDrawerOpen
              ? "animate-slide_in_left_fade "
              : "animate-slide_out_left_fade hidden"
          } `}
        >
          <div className="w-full md:w-1/3 bg-sacbeBrandColor h-screen border-r-2 ">
            <div className="flex justify-end px-6 py-2">
              <Hamburger
                toggled={isDrawerOpen}
                onToggle={() => {
                  toggleDrawer();
                }}
              ></Hamburger>
            </div>
            <div className="ml-10 ">
              {menuItems.map((item) => {
                return (
                  <Link
                    onClick={() => {
                      toggleDrawer();
                    }}
                    key={`drawerMenu ${item.link}+${item.text}`}
                    href={item.link}
                  >
                    <h1 className="my-10 hover:text-[white] duration-300">
                      {item.text}
                    </h1>
                  </Link>
                );
              })}
              <PrimaryButton
                text="log Out"
                onClicked={() => {
                  signOut();
                }}
              ></PrimaryButton>
            </div>
          </div>
          <div
            className="w-2/3"
            onClick={() => setDrawerOpenState(!isDrawerOpen)}
          ></div>
        </div>
      }
    </div>
  );
}
