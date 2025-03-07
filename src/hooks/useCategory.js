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
        setCategories(res);
      } catch (error) {
        return error;
      }
    }

    getCategories();
  }, []);

	return {categories};

};
