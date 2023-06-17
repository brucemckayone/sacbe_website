"use client";
import AfilliateSales from "@/components/affiliate/affiliate_sales";
import UserProvider from "@/components/auth/affiliate_auth_context";
import AuthProvider from "@/components/providers/SessionProvider";
import React, { useState } from "react";

import { PortalSideBar } from "./PortalSideBar";

function Page() {
  const [mainBody, setMainBody] = useState(
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Welcome to the Partner Portal
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Here you can view your sales and manage your account
        </p>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          If you have any questions please contact us at
          <a
            className="text-blue-500"
            href="mailto:"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            email
          </a>
        </p>

        <AfilliateSales />
      </div>
    </div>
  );
  return (
    <UserProvider>
      <AuthProvider>
        <div>
          <PortalSideBar setMainBody={setMainBody}></PortalSideBar>
          {mainBody}
        </div>
      </AuthProvider>
    </UserProvider>
  );
}
export default Page;
