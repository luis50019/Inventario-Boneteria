import { useEffect, useState } from "react";
import { useProductContext } from "../context/ProductContex";

//hook para obtener las categorias
export const useCategory = () => {
  const [categories, setCategories] = useState([]);
	
	const  {getAllCategories} = useProductContext()
  useEffect(() => {
    async function getCategories() {
      try {
        const res = await getAllCategories();
        console.log(res);
        setCategories(res);
      } catch (error) {
        console.log("error no se han obtenido las categorias");
      }
    }

    getCategories();
  }, []);

	return {categories};

};
