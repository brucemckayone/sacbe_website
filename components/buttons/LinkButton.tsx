"use client";
import React from "react";
import Link from "next/link";
import PrimaryButton from "./primaryButton";

interface props {
  url: string;
  isPrimary: Boolean;
  text: string;
}

function LinkButton({ url, text, isPrimary = false }: props) {
  return (
    <Link href={url}>
      <PrimaryButton text={text} onClicked={() => {}} isPrimary={isPrimary} />
    </Link>
  );
}

export default LinkButton;
