"use client";
import { ClientSafeProvider, signIn } from "next-auth/react";
import React from "react";
import SmallButton from "./small_button";

function ProviderSigninButton(provider: ClientSafeProvider, logo: string) {
  return (
    <div className="flex flex-row text-center justify-center">
      <SmallButton
        onClicked={async () => {
          signIn(provider.id);
        }}
        text={`Sign In With ${provider.name}`}
        isPrimary={false}
        className="text-center"
      />
    </div>
  );
}

export default ProviderSigninButton;
