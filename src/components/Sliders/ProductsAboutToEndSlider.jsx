import React from "react";
import Slider from "./Slider";
import { CardClothing } from "../Cards/CardClothing";
export default function ProductsAboutToEndSlider({ products }) {
  return (
    <>
      <Slider height={"80"} title={"Productos por agotarse"}>
        {products?.map((product, index) => (
          <CardClothing
            availableUnits={product.availableUnits}
            id={product._id}
            incomeGenerated={product.incomeGenerated}
            numberPosition={index + 1}
            productName={product.productName}
            profitsTotal={product.profitsGenerated}
            size={product.garment.size.size}
            soldUnits={product.soldUnits}
            images={product.images}
            key={product._id}
          />
        ))}
      </Slider>
    </>
  );
}
