"use client";
import "../../globals.css";
import AuthProvider from "@/components/providers/SessionProvider";
import {
  Marcellus as displayFont,
  Marcellus as bodyFont,
} from "next/font/google";

import SmallButton from "@/components/shared/buttons/small_button";
import { fetchPostJSON } from "@/utils/http/fetchPostJson";
import Link from "next/link";
import { DashboardSideBarListTile } from "../../../components/customer/posts/DashboardSideBarListTile";
import { Toaster } from "react-hot-toast";

import UserProvider, { useUser } from "@/components/shared/auth/UserProvider";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AffiliateLinkProvider from "@/components/providers/AffiliatePaymentLinkProvider";
import { SideBarToggle } from "@/components/customer/posts/PortalSideToggleButton";
import api from "@/lib/apiSchema/apiSchema";

const raleway = displayFont({
  variable: "--display-font",
  weight: "400",
  subsets: ["latin", "latin-ext"],
});

const merriweather = bodyFont({
  variable: "--body-font",
  weight: "400",
  subsets: ["latin", "latin-ext"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  // Access the current URL path
  const pathname = usePathname();

  return (
    <html className={`${raleway.variable} ${merriweather.variable} bg-surface`}>
      <AuthProvider>
        <UserProvider>
          <AffiliateLinkProvider>
            <body>
              <div className="s">
                <SideBarToggle isOpen={isOpen} setIsOpen={setIsOpen} />
                <aside
                  id="cta-button-sidebar"
                  className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform shadow-lg ${
                    !isOpen && "-translate-x-full sm:translate-x-0"
                  }`}
                  aria-label="Sidebar"
                >
                  <div className="h-full px-3 py-4 overflow-y-auto bg-tertiaryContainer">
                    <SideBarToggle isOpen={isOpen} setIsOpen={setIsOpen} />
                    <div className="bg-surface rounded-lg p-2 my-5 hover:bg-tertiaryContainer shadow-md">
                      <Link className="no-underline" href={"/"}>
                        <p>{"< Back To HomePage"}</p>
                      </Link>
                    </div>
                    <ul className="space-y-2 font-medium">
                      <DashboardSideBarListTile
                        toggleBar={setIsOpen}
                        text="Dashboard"
                        iconUrl=""
                        url="/portal"
                        isSelected={pathname == "/portal"}
                        key={"Dashboard list tiem"}
                      />
                      <DashboardSideBarListTile
                        toggleBar={setIsOpen}
                        text="Affiliate"
                        url="/portal/affiliate"
                        iconUrl=""
                        isSelected={pathname == "/portal/affiliate"}
                        key={"Affiliate list tiem"}
                      />
                      <DashboardSideBarListTile
                        toggleBar={setIsOpen}
                        // update={props.setMainBody}
                        url="/portal/wholesale"
                        text="Wholesale"
                        iconUrl=""
                        isSelected={pathname == "/portal/wholesale"}
                        key={"Wholesale list tiem"}
                      />
                      <SmallButton
                        text={"Manage Account"}
                        onClicked={async () => {
                          try {
                            const billingPortal = await fetchPostJSON(
                              "api/stripe/billing/create_customer_portal",
                              {
                                customerId: user.customerId,
                                isSubscription: false,
                              }
                            );

                            window.open(billingPortal.url);
                          } catch (e) {
                            console.error(e);
                          }
                        }}
                      ></SmallButton>
                    </ul>
                    {/* <SideBarNotification
                  callToActionTitle="Become An Affiliate"
                  body="This is the body that we are using to convince you"
                  title="Affiliate Program"
                  ctaUrl="/affiliate"
                ></SideBarNotification> */}
                  </div>
                </aside>
              </div>
              {children}
              <Toaster />
            </body>
          </AffiliateLinkProvider>
        </UserProvider>
      </AuthProvider>
    </html>
  );
}
