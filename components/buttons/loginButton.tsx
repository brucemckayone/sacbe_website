"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import PrimaryButton from "./primaryButton";
import Link from "next/link";
import { fetchPostJSON } from "@/utils/stripe/fetchPostJson";
import { getStripeCustomerIdByEmail } from "@/lib/firebase/getStripeCustomerId";
import { useState } from "react";
import { Avatar, Popover } from "@mantine/core";
import { usePathname } from "next/navigation";
import { signInWithRedirect } from "firebase/auth";
import { signInAndRedirectTo } from "@/utils/client/auth/redirect/signinAndRedirectTo";
export default function LoginButton() {
  const { data } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname();
  const isLoggedIn = data != null; //data?.user?.email != null;
  return (
    <div className="text-end mr-3 align-bottom flex-col justify-center">
      <Popover>
        <Popover.Target>
          <div className="m-3">
            <Avatar
              src={null}
              alt="no image here"
              color={"orange"}
              className="rounded-full bg-transparent align-bottom h-[45px] w-[45px] drop-shadow-lg"
            />
          </div>
        </Popover.Target>
        <Popover.Dropdown>
          <div id="dropdown">
            <ul className="text-start py-2 " aria-labelledby="dropdown-button">
              {isLoggedIn && (
                <li
                  className="py-4 pr-5  border-b border-primaryContainer"
                  onClick={async () => {
                    await goToAccountManagement();
                  }}
                >
                  {isLoading ? "Loading..." : "Account"}
                </li>
              )}
              {isLoggedIn && (
                <li
                  className=" py-4 pr-5 text-start border-b border-primaryContainer"
                  onClick={() => signOut()}
                >
                  Log Out
                </li>
              )}
              {!isLoggedIn && (
                <li
                  className="py-4 pr-5 text-star tborder-b border-primaryContainer"
                  onClick={() => {
                    signInAndRedirectTo(pathname!);
                  }}
                >
                  Log In
                </li>
              )}
            </ul>
          </div>
        </Popover.Dropdown>
      </Popover>
      {/* {isLoggedIn ? (
        <button
          onClick={async () => {
            await goToAccountManagement();
          }}
          className="duration-500 bg-sacbeBrandColor py-1 px-8  my-3 rounded-md hover:bg-onPrimaryContainer hover:text-onPrimary border-2"
        >
          <h4>{`${!isLoading ? "ACCOUNT" : "LOADING..."}`}</h4>
        </button>
      ) : (
        <Link href={"/api/auth/signin"}>
          <button className="duration-500 bg-sacbeBrandColor py-1 px-8  my-3 rounded-md hover:bg-onPrimaryContainer hover:text-onPrimary border-2">
            <h4>LOGIN</h4>
          </button>
        </Link>
      )} */}
    </div>
  );

  async function goToAccountManagement() {
    setIsLoading(true);
    try {
      console.log(data?.user?.email);
      const customerId = await fetchPostJSON("api/users/get_user_id_by_email", {
        email: data?.user?.email,
      });
      console.log(customerId);

      const billingPortal = await fetchPostJSON(
        "api/stripe/billing/create_customer_portal",
        {
          customerId: customerId,
        }
      );

      window.open(billingPortal.url);
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  }
}
