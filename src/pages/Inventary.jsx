import React from "react";
import "../styles/CardInfo.css";

import { useAllProducts } from "../hooks/useAllProducts.js";
import { useInfoInventary } from "../hooks/useInfoInventary.js";

import { Search } from "../components/UI/Search.jsx";
import { CardsInfo } from "../components/Cards/CardsInfo.jsx";
import Slider from "../components/Sliders/Slider.jsx";
import TopProductSlider from "../components/Sliders/TopProductSlider.jsx";
import ProductManagement from "../components/Management/ProductManagement.jsx";
import ProductsAboutToEndSlider from "../components/Sliders/ProductsAboutToEndSlider.jsx";
import { useFindProduct } from "../hooks/useFindProduct.js";
import { useNavigate } from "react-router";

export default function Inventary() {
  const { InfoInventary, errorInfo, isLoadingInfo } = useInfoInventary();
  const { products, errorProducts,loadigProducts } = useAllProducts();
  const {getProductsByName,productsFind,setProductsFind} = useFindProduct();
  const navigate = useNavigate();
  const handlerSelectProduct =(product)=>{
    setProductsFind([]);
    navigate(`/Inventary/${product._id}`);
  }

  return (
    <>
      <Search getData={getProductsByName} data={productsFind} selectProduct={handlerSelectProduct} placeholder="calceta deportica,llavero marvel, llavero de plastico ..." />
      <Slider height={"64"}>
        {isLoadingInfo ? (
          <p className="text-xl h-full pt-28 font-extralight">Cargando Informacion del inventario...</p>
        ) : errorInfo ? (
          <p>{errorInfo}</p>
        ) : (
          InfoInventary?.slice(0, InfoInventary.length - 1)?.map(
            ({ title, value }, index) => (
              <CardsInfo titleCard={title} valor={value} key={index} />
            )
          )
        )}
      </Slider>

      {
        products.productsTop?(
          <TopProductSlider products={products.productsTop} />
        ):<p className="text-xl font-extralight h-[22rem]">Cargando los productos mas vendidos</p>
      }
      {products.productsAboutToEnd ?(
        <ProductsAboutToEndSlider products={products.productsAboutToEnd} />
      ):<p className="text-xl font-extralight h-[22rem]">Cargando los productos por agotarse</p>}
      {
        products.allProducts?(
          <ProductManagement products={products.allProducts} />
        ):<p className="text-xl font-extralight h-64">Cargando los productos</p>
      }
    </>
  );
}
