import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { UseContextApp } from "../context/AppContext";
import ProductForm from "../components/Form/ProductForm";
import ProductFormEdit from "../components/Form/ProductFormEdit";
import useGetProduct from "../hooks/useGetProduct";

export default function Product() {
  let { id } = useParams();
  const [idProduct, setIdProduct] = useState(id);
  const {product,error,loading} = useGetProduct(idProduct)

  return (
    <>
      {
        product == null?(<ProductForm />):(<ProductFormEdit productSelect={product}/>)
      }
    </>
  );
}
