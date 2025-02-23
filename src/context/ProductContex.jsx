import { createContext, useContext } from "react";
import { getCategories, getSizeByCategory,getGenders,editByProduct,deleteByProduct } from "../api/products";
const contextProduct = createContext();
export const useProductContext = () => {
  const context = useContext(contextProduct);
  if (!context) {
    return null;
  }
  return context;
};

const ProductProvider = ({ children }) => {

	const getAllCategories =async ()=>{
		try{
			const categories = await getCategories();
			return categories.data;
		}catch(e){
			console.log(e);
		}
	}

	const getByCategory =async(idCategory)=>{
		try {
			const sizes = await getSizeByCategory(idCategory);
			
			return sizes.data;
		} catch (error) {
			console.log(error);
		}
	}

	const deleteProduct = async(idProduct)=>{
		try{
			const res = await deleteByProduct(idProduct);
			return res.data;
		}catch(error){
			console.log(error);
			return error;
		}

	}

	const editProduct = async(idProduct,product)=>{
		try{
			const res = await editByProduct(idProduct,product);
			return res;
		}catch(error){
			console.log(error)
			return error;
		}

	}
	const getAllGender = async()=>{
		try{
			const res = await getGenders();
			return res.data;
		}catch(error){
			console.log(error);
			return error;
		}
	}

  return (
    <contextProduct.Provider value={{
			getAllCategories,
			getByCategory,
			getAllGender,
			editProduct,
			deleteProduct
		}}>
			{children}
		</contextProduct.Provider>
  );
};

export default ProductProvider;
