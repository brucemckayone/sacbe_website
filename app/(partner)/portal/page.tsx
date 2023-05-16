"use client";
import Portal from "@/app/(customer)/affiliates/portal/page";
import AffiliateProvider from "@/components/auth/affiliate_auth_context";
import PrimaryButton from "@/components/buttons/primaryButton";
import Link from "next/link";
import React, { useState } from "react";
import { DashboardSideBarListTile } from "./DashboardSideBarListTile";
import { SideBarNotification } from "./SideBarNotification";

function DashboardBody() {
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <Portal />
      </div>
    </div>
  );
}

function page() {
  const [mainBody, setMainBody] = useState(
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <Portal />
      </div>
    </div>
  );
  return (
    <AffiliateProvider>
      <div>
        <button
          data-drawer-target="cta-button-sidebar"
          data-drawer-toggle="cta-button-sidebar"
          aria-controls="cta-button-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
        <aside
          id="cta-button-sidebar"
          className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-tertiaryContainer">
            <div className="bg-surface rounded-lg p-2 my-5 hover:bg-tertiaryContainer">
              <Link className="no-underline" href={"/"}>
                <p>{"< Back To HomePage"}</p>
              </Link>
            </div>
            <ul className="space-y-2 font-medium">
              <DashboardSideBarListTile
                update={setMainBody}
                mainBody={
                  <div className="p-4 sm:ml-64">
                    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                      <Portal />
                    </div>
                  </div>
                }
                text="Dashboard"
                iconUrl=""
                key={"Dashboard list tiem"}
              ></DashboardSideBarListTile>
              <DashboardSideBarListTile
                update={setMainBody}
                mainBody={
                  <div className="p-4 sm:ml-64">
                    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                      <Portal />
                    </div>
                  </div>
                }
                text="Affiliate"
                iconUrl=""
                key={"Affiliate list tiem"}
              ></DashboardSideBarListTile>
              <DashboardSideBarListTile
                update={setMainBody}
                mainBody={
                  <div className="p-4 sm:ml-64">
                    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                      <h1>Select Quantity</h1>
                      <div className="flex flex-row flex-wrap">
                        <div className="rounded border p-5 m-3">Qty - 10</div>
                        <div className="rounded border p-5 m-3">
                          Cost - £400
                        </div>
                        <div className="rounded border p-5 m-3">
                          Shipping - £400
                        </div>
                        <div className="rounded border p-5 m-3">
                          Profit - £500
                        </div>
                      </div>
                      <PrimaryButton
                        text="Request Invoice"
                        onClicked={() => {
                          "send inoive";
                        }}
                        isPrimary={true}
                        key={"send invoice button "}
                      ></PrimaryButton>
                    </div>
                  </div>
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
        {mainBody}
      </div>
    </AffiliateProvider>
  );
}

function sideBar() {}

export default page;
