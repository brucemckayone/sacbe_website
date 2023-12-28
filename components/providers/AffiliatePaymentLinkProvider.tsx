"use client";
import { m, r } from "@/types/affiliatePaymentLinkType";
import { log } from "console";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
interface SearchContextProps {
  sublink: string;
  oneofflink: string;
}

export const SearchContext = createContext<SearchContextProps>({
  sublink: "",
  oneofflink: "",
});

export default function AffiliateLinkProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useSearchParams();

  const [searchParam, setSearchParam] = useState<SearchContextProps>({
    sublink: "",
    oneofflink: "",
  });

  useEffect(() => {
    const sublink = router?.get("sublink");
    const oneofflink = router?.get("oneofflink");
    if (sublink && oneofflink) {
      toast.success("A 15% discount has been applied to all puchases");
      setSearchParam({ oneofflink: oneofflink, sublink: sublink });
    }
  }, [router]);

  return (
    <SearchContext.Provider value={searchParam}>
      {children}
    </SearchContext.Provider>
  );
}
export function useAffiliateLinks() {
  return useContext(SearchContext);
}
