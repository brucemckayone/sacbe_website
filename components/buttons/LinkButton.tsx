"use client";
import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

interface props {
  url: string;
  isPrimary: Boolean;
  text: string;
}

function LinkButton({ url, text, isPrimary = false }: props) {
  const PrimaryButton = dynamic(() =>
    import("./primaryButton").then((res) => res.default)
  );

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
