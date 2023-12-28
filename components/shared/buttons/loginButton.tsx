"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Avatar, Popover } from "@mantine/core";
import { usePathname } from "next/navigation";
import { useUser } from "../auth/UserProvider";
import { fetchGetJSON } from "@/utils/http/fetchGetJSON";
import toast from "react-hot-toast";

export default function LoginButton() {
  const { data } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const user = useUser();
  const pathname = usePathname();
  const isLoggedIn = data != null; //data?.user?.email != null;

  return (
    <div className="text-end mr-3 align-bottom flex-col justify-center">
      {isLoggedIn ? (
        <Popover position="left-start">
          <Popover.Target>
            <div className="m-1">
              <Avatar
                src={null}
                alt="no image here"
                color={"orange"}
                className="rounded-full bg-transparent align-bottom h-[45px] w-[45px] shadow-lg hover:drop-shadow-lg duration-200"
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
                      await goToAccountManagement({
                        customerId: user.user.customerId!,
                        isSubscription: false,
                      });
                    }}
                  >
                    {isLoading ? "Loading..." : "Account"}
                  </li>
                )}
                {isLoggedIn && (
                  <li
                    className="py-4 pr-5  border-b border-primaryContainer"
                    onClick={async () => {
                      setIsLoading(true);
                      const response = await fetchGetJSON(
                        `/api/stripe/billing/subscription?customerId=${user.user.customerId}`
                      );
                      if (response.canEdit) {
                        await goToAccountManagement({
                          customerId: user.user.customerId!,
                          isSubscription: true,
                        });
                      } else {
                        toast.error(
                          "You must have a subscription for more than 90 days before you can edit it"
                        );
                      }
                      setIsLoading(false);
                    }}
                  >
                    {isLoading ? "Loading..." : "Subscription"}
                  </li>
                )}
                {isLoggedIn && (
                  <li
                    className=" py-4 pr-5 text-start border-b border-primaryContainer"
                    onClick={async () => {
                      const signOut = (await import("next-auth/react")).signOut;
                      signOut();
                    }}
                  >
                    Log Out
                  </li>
                )}
              </ul>
            </div>
          </Popover.Dropdown>
        </Popover>
      ) : (
        <button
          onClick={async () => {
            const signInAndRedirectTo = (
              await import("@/lib/auth/signinAndRedirectTo")
            ).signInAndRedirectTo;
            signInAndRedirectTo(pathname!);
          }}
          className="bg-sacbeBrandColor hover:bg-onPrimaryContainer border-black hover:text-white duration-200 border-2 m-1.5 p-1 px-2 md:p-1 md:px-8 rounded-full"
        >
          <p className=" text-xl md:text-2xl font-display">LOGIN</p>
        </button>
      )}
    </div>
  );

  async function goToAccountManagement(props: {
    isSubscription?: boolean;
    customerId: string;
  }): Promise<void> {
    const fetchPostJSON = (await import("@/utils/http/fetchPostJson"))
      .fetchPostJSON;

    setIsLoading(true);
    try {
      //create if not already a thing
      if (!props.customerId)
        props.customerId = await fetchPostJSON(
          "api/users/get_user_id_by_email",
          {
            email: data?.user?.email,
          }
        );

      const billingPortal = await fetchPostJSON(
        "api/stripe/billing/create_customer_portal",
        {
          customerId: props.customerId!,
          isSubscription: props.isSubscription!,
        }
      );

      window.location.href = billingPortal.url;
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  }
}
