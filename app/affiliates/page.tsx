import React from "react";
import { envConfig } from "@/lib/webhooks/envConfig";
import { getServerSession } from "next-auth/next";

export default async function AffiliatePage() {
  const session = await getServerSession();
  return (
    <div>
      {/* <p>{session?.user?.name}</p> */}
      <div>
        <p>envConfig</p>
        <p>{session?.user?.email}</p>
      </div>
    </div>
  );
}
