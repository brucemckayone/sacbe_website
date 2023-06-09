"use client";
import { m, r } from "@/types/affiliatePaymentLinkType";
import { log } from "console";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, createContext, useState, useEffect } from "react";
interface SearchContextProps {
  sublink: string;
  oneofflink: string;
}

export const SearchContext = createContext<SearchContextProps>({
  sublink: '',
  oneofflink: ''
});

export default function AffiliateLinkProvider({
  children,
}: {
  children: React.ReactNode; 
}) {
  
  const router = useSearchParams();
  
  const [searchParam, setSearchParam] = useState<SearchContextProps>({
      sublink: '',
      oneofflink: ''
    });

  useEffect(() => {
    console.log('calledheeeeeee hhhrrhheeh');
    
    const sublink  = router?.get("sublink");
    const oneofflink  = router?.get("oneofflink");
    console.log(sublink);
    console.log(oneofflink);
    console.log(router?.toString());
    
    if (sublink  && oneofflink) {
      console.log('passed');
      setSearchParam({oneofflink:oneofflink, sublink:sublink});
    }
  }, [router]);
0
  return (
    <>
      <SearchContext.Provider value={searchParam}>{children}</SearchContext.Provider>
    </>
  );
}
