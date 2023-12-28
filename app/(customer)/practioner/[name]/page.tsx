import React from "react";
import { firestore } from "firebase-admin";
import adminInit from "@/lib/firebase/admin_init";
import { notFound } from "next/navigation";
import Image from "next/image";
import PurchaseOptions from "../../../../components/customer/shared/PurchaseOptions";
adminInit();
async function fetchAffiliateProfile(profile: string) {
  const db = firestore();
  const snapshot = await db.collection("affiliate_profile").doc(profile).get();
  return snapshot.data();
}

const AffiliateProfile = async ({ params }: { params: { name: string } }) => {
  const name = await fetchAffiliateProfile(params.name);
  if (!name) return notFound();

  return (
    <div className="md:w-7/12 m-auto">
      <div className="w-full m-auto">
        <div className="flex md:flex-row flex-col justify-center w-full items-center">
          <Image
            src={name.image}
            width={1000}
            height={1000}
            alt={`${name.firstName} ${name.lastName} profile picture`}
            className="object-cover rounded-md drop-shadow-md m-auto h-[600px] md:h-[500px] w-[400px] md:w-[500px] mt-5  md:mt-10 b"
          />
          <div className="md:fixed right-0  flex flex-row md:flex-col justify-around  ">
            <Image
              src={"/icons/instagram.svg"}
              width={50}
              height={50}
              alt="instagram"
            />
            <Image
              src={"/icons/facebook.svg"}
              width={50}
              height={50}
              alt="facebook"
            />
            <Image
              src={"/icons/linkedin.svg"}
              width={50}
              height={50}
              alt="linkedin"
            />
            <Image
              src={"/icons/tiktok.svg"}
              width={50}
              height={50}
              alt="tiktok"
            />
          </div>
        </div>
      </div>
      <div className="p-2 md:mx-20 mx-5">
        <h1 className="text-center">{`${name.firstName} ${name.lastName}`}</h1>

        <div className="flex justify-between my-10 border-b md:mx-10">
          <p>Location:{"insert location"}</p>
          <p>website:{"insert location"}</p>
          <p>Cacao:{"insert location"}</p>
        </div>
        <div className="md:mx-20">
          <h2 className="mt-5">About</h2>
          <p>{name.myJourneyWithSacbe}</p>
        </div>
      </div>
    </div>
  );
};

export default AffiliateProfile;
