import React from "react";
import { RiskApealCards } from "../../RiskApealCards";
import { ProductImageSelector } from "./ProductImageSelector";

const testProduct: ProductType = {
  name: "Sacbe Cacao",
  description:
    "Sacbe Cacao is a ceremonial cacao company that sources cacao from the jungles of Guatemala. We are dedicated to providing the highest quality cacao to our customers.",
  images: [
    "https://sacbe-ceremonial-cacao.com/sacbe_product_with_shapes.webp",
    "https://sacbe-ceremonial-cacao.com/pouring_cacao_cup.png",
    "https://sacbe-ceremonial-cacao.com/yellow_cacao_pods.jpg",
    "https://sacbe-ceremonial-cacao.com/yellow_cacao_pods.jpg",
  ],
  imageAlt: "Sacbe Cacao",
  url: "https://sacbe-ceremonial-cacao.com",
  price: "1.00",
  priceCurrency: "USD",
  priceValidUntil: "2022-12-31",
  availability: "https://schema.org/InStock",
  stock: "100",
};

type ProductType = {
  name: string;
  description: string;
  images: string[];
  imageAlt: string;
  url: string;
  price: string;
  priceCurrency: string;
  priceValidUntil: string;
  availability: string;
  stock: string;
};

function ProductPage(props: { product: ProductType }) {
  props.product = testProduct;
  const product = props.product;
  return (
    <article>
      <section className="flex flex-col md:flex-row w-11/12 md:w-8/12 m-auto">
        <ProductImageSelector images={product.images} />
        <div className="flex flex-col ml-10">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
        </div>
      </section>

      <section>
        <RiskApealCards isHorizontal={true}></RiskApealCards>
      </section>
    </article>
  );
}

export default ProductPage;
