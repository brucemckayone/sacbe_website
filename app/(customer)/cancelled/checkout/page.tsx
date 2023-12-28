"use client";

import PrimaryButton from "@/components/shared/buttons/primaryButton";
import { analytics } from "@/lib/firebase/firebase";
import { logEvent } from "firebase/analytics";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

function OrderCancelledPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams!.get("session_id");

  useEffect(() => {
    logEvent(analytics, "order_cancelled", {
      checkout_session: sessionId,
    });
    window.location.href = "/";
  }, [sessionId]);

  //   window.location.href = "/";
  return (
    <>
      <PrimaryButton
        text={"return to home"}
        onClicked={() => {}}
      ></PrimaryButton>
    </>
  );
}

export default OrderCancelledPage;
