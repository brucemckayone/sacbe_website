import React from "react";
import PurchaseOptions from "../../../../components/customer/shared/PurchaseOptions";
import { RiskApealCards } from "../../../../components/customer/shared/RiskApealCards";
import { ProductImageSelector } from "./ProductImageSelector";
import NavMenuBottom from "@/components/menu/NavMenuBottom";
import BenifitsOfCacao from "@/components/shared/body/benifits_of_cacao";
import { FeaturesHorizontalList } from "@/components/shared/headers/homePage/headerInformation";
import { firestore } from "firebase-admin";
import { TestMarkdown } from "../../../../components/customer/posts/MarkDown";
import adminInit from "@/lib/firebase/admin_init";

async function getProduct() {
  adminInit();
  const db = firestore();
  const product = await db.collection("products").doc("sacbe-cacao").get();
  return product.data();
}
async function ProductPage() {
  const product = (await getProduct()) as any;
  return (
    <article>
      <section className="flex flex-col md:flex-row w-11/12 md:w-10/12 m-auto">
        <div className="w-full">
          <ProductImageSelector images={product.images} />
        </div>
        <div className="flex flex-col md:ml-10 mt-10 md:mt-0">
          <h1 className="text-5xl md:text-8xl">{product.name.toUpperCase()}</h1>
          <FeaturesHorizontalList />
          <TestMarkdown testContent={product.description} />
          <RiskApealCards isHorizontal={false}></RiskApealCards>
          <PurchaseOptions isHorizontal={true} compact={true} />
        </div>
      </section>
      <section className="mt-10">
        <NavMenuBottom />
      </section>

      <section className="bg-tertiaryContainer">
        <h2 className="w-6/12 m-auto text-center p-10">
          I felt so deeply connected with my heart centre and Third eye. Lot’s
          of colours and pleasant tingles, you really can tell its made with
          love. This is some potent Cacao! It set me up amazingly for the day
          ahead, I just felt so energised and full of love & compassion.
        </h2>
        <BenifitsOfCacao />
      </section>

      <div className="bg-gradient-to-b from-primaryContainer to-surface">
        <section className="w-11/12 md:w-7/12 m-auto">
          <TestMarkdown testContent={product.content} />
        </section>
      </div>
    </article>
  );
}

export default ProductPage;
