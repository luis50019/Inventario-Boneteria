import { useEffect, useState } from "react";
import { useProductContext } from "../context/ProductContex";

export const useSizes = () => {
	const {getByCategory} = useProductContext()
	const [categorySelect, setCategorySelect] = useState("");
  const [sizes, setSizes] = useState([]);

	useEffect(() => {
		async function getSizes(categorySelect){
			try {
				if (categorySelect) {
					console.log("Category", categorySelect);
					const res = await getByCategory(categorySelect);
					setSizes(res);
				}else{
					setSizes([]);
	
				}
			} catch (error) {
				console.log("Error", error);
			}
		}
		getSizes(categorySelect);
	},[categorySelect])

	return { sizes,setCategorySelect };
};
