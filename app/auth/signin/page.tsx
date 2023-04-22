import { getProviders } from "next-auth/react";
import MagicLinkForm from "@/components/form/MagicLinkForm";
import ProviderSigninButton from "@/components/buttons/ProviderSigninButton";

import SlideInUp from "@/components/animations/slide_in_up";
import Footer from "@/components/footer";

export default async function SignIn() {
  const providers = await getProviders();

  return (
    <div>
      <div className="flex flex-col items-center justify-around bg-gradient-to-br pt-10 from-sacbeBrandColor to-primaryContainer">
        <SlideInUp animiation="animate-zoom_in_fade">
          <div className=" bg-surfaceVarient px-10 md:px-20 py-24 mb-40 rounded-xl border-2 shadow-2xl m-4 ">
            <div className="text-center border-b-2 pb-6 mb-3">
              <MagicLinkForm />
            </div>
            <div key={providers!.google.name}>
              <ProviderSigninButton
                id={providers!.google.id}
                name={providers!.google.name}
                type={providers!.google.type}
                signinUrl={providers!.google.signinUrl}
                callbackUrl={providers!.google.callbackUrl}
              />
            </div>
          </div>
        </SlideInUp>
      </div>
      <Footer></Footer>
    </div>
  );
}
