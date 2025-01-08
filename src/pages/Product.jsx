import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { UseContextApp } from "../context/AppContext";
import ProductForm from "../components/Form/ProductForm";

export default function Product() {
  let { id } = useParams();
  let location = useLocation();

  const { getProduct } = UseContextApp();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id);
        console.log(data);
        setProduct(data);
      } catch (error) {
        setError("Hubo un error al cargar el producto");
      } finally {
        setLoading(false);
      }
    };
    if(id)fetchProduct();
  },[id]);

  return (
    <>
      
			<ProductForm product={product} option={location.pathname === '/Inventary/NewProduct'?'new':'view'} />
    </>
  );
}
