import { createContext, useContext, useState } from "react";
import { getStadisticGeneral, InfoInventary } from "../api/statistics.js";
import {getAllProducts, getTopProducts,getProductsAboutToEnd,getProductSpecific,addProduct} from '../api/products.js'
const AppContext = createContext(); 

export const UseContextApp = ()=> useContext(AppContext);

export function AppProvider({children}){

  const [isLoading,setLoading] = useState(true);
  const [error,setError] = useState(null);

  const getStadistics = async ()=>{
    try {
      setLoading(true);
      const data = await getStadisticGeneral();
      
      return data.data
      
    } catch (error) {
      setError('Hubo un error al cargar las estadisticas');
    }finally{
      setLoading(false);
    }
  }

  const getInfoInventary = async ()=>{
    try {
      setLoading(true);
      const data = await InfoInventary();
      return data.data.reverse();
    } catch (error) {
      setError('Hubo un error al cargar la informacion del inventario');
    }finally{
      setLoading(false);
    }
  }

  const getProducts = async ()=>{
    try{
      setLoading(true);
      const products = await getAllProducts();
      const productsTop = await getTopProducts();
      const productsAboutToEnd = await getProductsAboutToEnd();

      const inventary = {
        allProducts: products.data,
        productsTop: productsTop.data,
        productsAboutToEnd: productsAboutToEnd.data.length>0?productsAboutToEnd.data:null
      }
      return inventary;
    }catch(e){
      setError('Hubo un error al cargar los productos');
      
    }finally{
      setLoading(false);
    }
  }

  const getProduct=async (id)=>{
    try {
      const product = await getProductSpecific(id); 
      return product.data;
    } catch (error) {
      setError('Hubo un error al cargar el producto');
    }
  }

  const addProductToInventary =async(dataProduct)=>{
    try {
      const data = await addProduct(dataProduct);
      return data;
    } catch (error) {
      setError('Hubo un error al añadir el producto al inventario');
    }

  }

  return(
    <AppContext.Provider value={{
      getStadistics,
      getInfoInventary,
      getProducts,
      getProduct,
      addProductToInventary,
      isLoading,
      error
    }}>
      {children}
    </AppContext.Provider>
  )
}

