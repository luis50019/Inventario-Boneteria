import React, { useEffect,useState } from "react";
import Slider from "./Slider";
import {CardClothing} from "../Cards/CardClothing";

export default function TopProductSlider({ products=[] }) {
  const [existingProducts, setExistingProducts] = useState(false);
  useEffect(()=>{
    if (products?.length>0) {
      setExistingProducts(true);
    } else {
      setExistingProducts(false);
    }

  },[products ])

  return (
    <>
      {existingProducts&&(
        <Slider height={"auto"} title={"Productos más vendidos"}>
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
      )}
    </>
  );
}
