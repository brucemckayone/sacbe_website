"use client";
import { useSession } from "next-auth/react";
import PrimaryButton from "./primaryButton";
import Link from "next/link";

export default function LoginButton() {
  const { data } = useSession();

  const isLoggedIn = data != null; //data?.user?.email != null;
  return (
    <div className="m-1">
      {isLoggedIn ? (
        <button
          onClick={() => {
            window.open(
              "https://billing.stripe.com/p/login/test_dR629SgVlcYOdri000"
            );
          }}
          className="duration-500 bg-sacbeBrandColor py-1 px-8  my-3 rounded-md hover:bg-onPrimaryContainer hover:text-onPrimary border-2"
        >
          <h4>MANAGE ACCOUNT</h4>
        </button>
      ) : (
        <Link href={"/api/auth/signin"}>
          <button className="duration-500 bg-sacbeBrandColor py-1 px-8  my-3 rounded-md hover:bg-onPrimaryContainer hover:text-onPrimary border-2">
            <h4>LOGIN</h4>
          </button>
        </Link>
      )}
    </div>
  );
}
