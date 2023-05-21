"use client";
import Portal from "@/app/(customer)/affiliates/portal/page";
import AfilliateSales from "@/components/affiliate/affiliate_sales";
import { useUser } from "@/components/auth/affiliate_auth_context";
import AffiliateStatusChecker from "@/components/buttons/getAffiliateLinkButton";
import CardLoader from "@/components/loaders/CardLoader";
import Link from "next/link";
import React, { use, useState } from "react";
import { DashboardSideBarListTile } from "./DashboardSideBarListTile";
import { SideBarNotification } from "./SideBarNotification";
import { WholesalePortalPage } from "./WholesalePortalPage";

function SideBarToggle(props: {
  setIsOpen: (arg0: boolean) => void;
  isOpen: boolean;
}) {
  return (
    <button
      onClick={() => {
        props.setIsOpen(!props.isOpen);
        console.log(props.isOpen);
      }}
      data-drawer-target="cta-button-sidebar"
      data-drawer-toggle="cta-button-sidebar"
      aria-controls="cta-button-sidebar"
      type="button"
      className="inline-flex items-end justify-end p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    >
      <span className="sr-only">Open sidebar</span>
      <svg
        className="w-6 h-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clip-rule="evenodd"
          fill-rule="evenodd"
          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
        ></path>
      </svg>
    </button>
  );
}

export function PortalSideBar(props: any) {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, user, isError } = useUser();

  if (isError)
    return (
      <h1>There was an error fetching your account sign in and out again</h1>
    );

  if (isLoading) return <CardLoader />;

  return (
    <div className="s">
      <SideBarToggle isOpen={isOpen} setIsOpen={setIsOpen}></SideBarToggle>
      <aside
        id="cta-button-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform shadow-lg ${
          !isOpen && "-translate-x-full sm:translate-x-0"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-tertiaryContainer">
          <SideBarToggle isOpen={isOpen} setIsOpen={setIsOpen}></SideBarToggle>
          <div className="bg-surface rounded-lg p-2 my-5 hover:bg-tertiaryContainer shadow-md">
            <Link className="no-underline" href={"/"}>
              <p>{"< Back To HomePage"}</p>
            </Link>
          </div>
          <ul className="space-y-2 font-medium">
            <DashboardSideBarListTile
              toggleBar={setIsOpen}
              update={props.setMainBody}
              mainBody={<div className="sm:ml-64"></div>}
              text="Dashboard"
              iconUrl=""
              key={"Dashboard list tiem"}
            ></DashboardSideBarListTile>
            <DashboardSideBarListTile
              toggleBar={setIsOpen}
              update={props.setMainBody}
              mainBody={
                <div className="sm:ml-64">
                  <div className="p-4">
                    <AffiliateStatusChecker />
                  </div>
                </div>
              }
              text="Affiliate"
              iconUrl=""
              key={"Affiliate list tiem"}
            ></DashboardSideBarListTile>
            <DashboardSideBarListTile
              toggleBar={setIsOpen}
              update={props.setMainBody}
              mainBody={
                <WholesalePortalPage
                  key={"wholesale portal page"}
                ></WholesalePortalPage>
              }
              text="Wholesale"
              iconUrl=""
              key={"Wholesale list tiem"}
            ></DashboardSideBarListTile>
          </ul>
          <SideBarNotification
            callToActionTitle="Become An Affiliate"
            body="This is the body that we are using to convince you"
            title="Affiliate Program"
            ctaUrl="/affiliate"
          ></SideBarNotification>
        </div>
      </aside>
    </div>
  );
}
