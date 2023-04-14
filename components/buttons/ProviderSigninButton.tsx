"use client";
import { ClientSafeProvider, signIn } from "next-auth/react";
import React from "react";
import Image from "next/image";

import SmallButton from "./small_button";
import { Divider } from "@mantine/core";
function ProviderSigninButton(provider: ClientSafeProvider, logo: string) {
  return (
    <div className="flex flex-row text-center justify-center">
      <SmallButton
        onClicked={() => signIn(provider.id)}
        text={`Sign In With ${provider.name}`}
        isPrimary={false}
        imageUrl="/google-logo-9808.png"
        className="text-center"
      />
    </div>
  );
}

export default ProviderSigninButton;
