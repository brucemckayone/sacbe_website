import { fetchPostJSON } from "@/utils/stripe/fetchPostJson";
import React from "react";

function createAffiliateLink() {
  fetchPostJSON("api/stripe/", {});
}

export default createAffiliateLink;
