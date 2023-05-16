"use client";
import React from "react";
import PrimaryButton from "./primaryButton";
import Link from "next/link";
interface props {
  url: string;
  isPrimary: Boolean;
  text: string;
}

function LinkButton({ url, text, isPrimary = false }: props) {
  return (
    <Link href={url}>
      <PrimaryButton
        text={text}
        onClicked={() => {
          window.location.href = url;
        }}
        isPrimary={isPrimary}
      />
    </Link>
  );
}

export default LinkButton;
