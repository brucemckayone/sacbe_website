"use client";
import { auth } from "../../lib/firebase";
import "../../app/globals.css";
import Hamburger from "hamburger-react";
import Image from "next/image";
import LoginButton from "./LoginButton";
import Link from "next/link";
import PrimaryButton from "../buttons/primaryButton";
export default function Navbar(props: any) {
  const user = null;
  const username = null;

  return (
    <header className="sticky flex flex-row justify-between border-b-4 border-t-4 border-onSurface align-baseline">
      <div className="flex m-2 mx-10">
        <Hamburger></Hamburger>
      </div>
      <Link className="flex" href="/">
        <Image src="/logo.svg" alt="logo" width={300} height={80}></Image>
      </Link>
      <PrimaryButton text="LOGIN" onClick={() => {}}></PrimaryButton>
    </header>
  );
}

// Sign out button
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

function UsernameForm() {
  return null;
}
