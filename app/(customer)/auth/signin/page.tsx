import { getProviders } from "next-auth/react";
import MagicLinkForm from "@/components/shared/form/MagicLinkForm";
import ProviderSigninButton from "@/components/shared/buttons/ProviderSigninButton";
import SlideInUp from "@/components/animations/slide_in_up";

async function SignIn() {
  const providers = await getProviders();
  return (
    <div className="flex flex-col items-center justify-around bg-gradient-to-br pt-10 from-sacbeBrandColor  to-primaryContainer">
      <SlideInUp animiation="animate-zoom_in_fade">
        <div className=" bg-surfaceVarient px-10 md:px-20 py-24 mb-40 rounded-xl border-2 border-black shadow-2xl m-4 ">
          <div className="text-center border-black border-b-2 pb-6 mb-3">
            <MagicLinkForm />
          </div>
          <div key={"Google"}>
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
  );
}

export default SignIn;
