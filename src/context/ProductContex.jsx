import { createContext, useContext, useState } from "react";
import { getCategories, getSizeByCategory,getGenders,editByProduct,deleteByProduct } from "../api/products";
import { set } from "react-hook-form";
const contextProduct = createContext();
export const useProductContext = () => {
  const context = useContext(contextProduct);
  if (!context) {
    return null;
  }
  return context;
};

const ProductProvider = ({ children }) => {
	const [isLoading,setIsLoading] = useState(true);
	const getAllCategories =async ()=>{
		try{
			setIsLoading(true)
			const categories = await getCategories();
			return categories.data;
		}catch(e){
			return e;
		}finally{
			setIsLoading(false)
		}
	}

	const getByCategory =async(idCategory)=>{
		try {
			setIsLoading(true)
			const sizes = await getSizeByCategory(idCategory);
			return sizes.data;
		} catch (error) {
			return error
		}finally{
			setIsLoading(false)
		}
	}

	const deleteProduct = async(idProduct)=>{
		try{
			setIsLoading(true)
			const res = await deleteByProduct(idProduct);
			return res.data;
		}catch(error){
			return error;
		}finally{
			setIsLoading(false)
		}

	}

	const editProduct = async(idProduct,product)=>{
		console.log(product)
		try{
			setIsLoading(true)
			const res = await editByProduct(idProduct,product);
			return res;
		}catch(error){
			return error;
		}finally{
			setIsLoading(false)
		}

	}
	const getAllGender = async()=>{
		try{
			setIsLoading(true)
			const res = await getGenders();
			return res.data;
		}catch(error){
			return error;
		}finally{
			setIsLoading(false)
		}
	}

  return (
    <contextProduct.Provider value={{
			getAllCategories,
			getByCategory,
			getAllGender,
			editProduct,
			deleteProduct,
			isLoading
		}}>
			{children}
		</contextProduct.Provider>
  );
};

export default ProductProvider;
