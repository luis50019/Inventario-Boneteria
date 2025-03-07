import { UseContextApp } from "../context/AppContext";
import { useState, useEffect } from "react";

export const useAllProducts = () => {
  const [products, setProducts] = useState({});
  const [errorProducts, setErrorProducts] = useState(null);
  const [loadigProducts,setLoadingProducts] = useState(true);
  const { getProducts } = UseContextApp();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoadingProducts(true)
        const data = await getProducts();
        setProducts(data);
      } catch (e) {
        setErrorProducts("hubo un error al obtener los productos");
      }finally{
        setLoadingProducts(false)
      }
    };
    getData();
  }, []);

  return { products, errorProducts,loadigProducts };
};
