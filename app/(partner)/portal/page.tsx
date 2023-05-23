"use client";
import Portal from "@/app/(customer)/affiliates/portal/page";

import UserProvider from "@/components/auth/affiliate_auth_context";
import AuthProvider from "@/components/providers/SessionProvider";
import React, { useState } from "react";
import { ToastProvider } from "react-toast-notifications";
import { PortalSideBar } from "./PortalSideBar";

function Page() {
  const [mainBody, setMainBody] = useState(
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div></div>
      </div>
    </div>
  );
  return (
    <ToastProvider>
      <UserProvider>
        <AuthProvider>
          <div>
            <PortalSideBar setMainBody={setMainBody}></PortalSideBar>
            {mainBody}
          </div>
        </AuthProvider>
      </UserProvider>
    </ToastProvider>
  );
}
export default Page;
