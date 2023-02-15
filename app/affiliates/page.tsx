import React from "react";

import { getServerSession } from "next-auth/next";

export default async function AffiliatePage() {
  const session = await getServerSession();
  return (
    <div>
      <p>{session?.user?.name}</p>
    </div>
  );
}
