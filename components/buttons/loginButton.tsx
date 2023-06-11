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
import { useUser } from "../auth/affiliate_auth_context";
import { Divide } from "hamburger-react";
export default function LoginButton() {
  const { data } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const user = useUser();
  const pathname = usePathname();
  const isLoggedIn = data != null; //data?.user?.email != null;
  return (
    <div className="text-end mr-3 align-bottom flex-col justify-center">
      <Popover position="left-start">
        <Popover.Target>
          <div className="m-3">
            <Avatar
              src={null}
              alt="no image here"
              color={"orange"}
              className="rounded-full bg-transparent align-bottom h-[50px] w-[50px] shadow-lg hover:drop-shadow-lg duration-200"
            />
          </div>
        </Popover.Target>
        <Popover.Dropdown>
          <div id="dropdown">
            <ul
              className="text-start py-2 mx-5 "
              aria-labelledby="dropdown-button"
            >
              {!user.isLoading &&
              (user.user.wholesale || user.user.affiliateStatus) ? (
                <div>
                  <li
                    className="py-4 pr-5  border-b border-primaryContainer"
                    onClick={async () => {
                      window.location.href = "/portal";
                    }}
                  >
                    {isLoading ? "Loading..." : "Portal"}
                  </li>
                </div>
              ) : (
                <div></div>
              )}
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
    </div>
  );

  async function goToAccountManagement(): Promise<void> {
    setIsLoading(true);
    try {
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
