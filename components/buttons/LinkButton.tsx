"use client";
import React from "react";
import PrimaryButton from "./primaryButton";
import Link from "next/link";
interface props {
  url: string;
  isPrimary: Boolean;
}

function LinkButton({ url, isPrimary = false }: props) {
  return (
    <Link href={url}>
      <PrimaryButton
        text="Learn More"
        onClicked={() => {
          window.location.href = url;
        }}
        isPrimary={isPrimary}
      />
    </Link>
  );
}

export default LinkButton;
