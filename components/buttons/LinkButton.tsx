"use client";
import React from "react";
import PrimaryButton from "./primaryButton";
import Link from "next/link";
interface props {
  url: string;
  isPrimary: Boolean;
}

function LinkButton({ url, isPrimary }: props) {
  return (
    <Link href={url}>
      <PrimaryButton text="Learn More" onClicked={() => {}} isPrimary={false} />
    </Link>
  );
}

export default LinkButton;
