import { useState, useEffect } from "react";
import { UseContextApp } from "../context/AppContext";
const useGetProduct = (id) => {
	const {getProduct} = UseContextApp();	
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id);
        console.log("deade: ",data);
        setProduct(data);
      } catch (error) {
        setError("Hubo un error al cargar el producto");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

	return {product, loading, error};

};

export default useGetProduct;