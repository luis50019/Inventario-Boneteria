import { createContext, useCallback, useContext, useState } from "react";
import { getStadisticGeneral, InfoInventary } from "../api/statistics.js";
import {getAllProducts, getTopProducts,getProductsAboutToEnd,getProductSpecific,addProduct,getProductsByName} from '../api/products.js'
const AppContext = createContext(); 

export const UseContextApp = ()=> useContext(AppContext);

export function AppProvider({children}){

  const [isLoading,setLoading] = useState(false);
  const [isNewProduct,setIsNewProduct] = useState(false);
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

  const findProductsByName = useCallback(async(name)=>{
    try {
      setLoading(true);
      if(name){
        const data = await getProductsByName(name);
        return data.data;
      }else{
        console.log("no hay nada")
      }
    } catch (error) {
      setError('Hubo un error al cargar los productos');
    }finally{
      setLoading(false);
    }
  })

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
      setLoading(true)
      const product = await getProductSpecific(id); 
      return product.data;
    } catch (error) {
      setError('Hubo un error al cargar el producto');
    }finally{
      setLoading(false)
    }
  }

  const addProductToInventary =async(dataProduct)=>{
    try {
      setLoading(true);
      const data = await addProduct(dataProduct);
      return data;
    } catch (error) {
      setError('Hubo un error al añadir el producto al inventario');
    }finally{
      setLoading(false)
      setIsNewProduct(true)
    }

  }


  return(
    <AppContext.Provider value={{
      getStadistics,
      getInfoInventary,
      getProducts,
      getProduct,
      addProductToInventary,
      setIsNewProduct,
      isNewProduct,
      findProductsByName,
      isLoading,
      error
    }}>
      {children}
    </AppContext.Provider>
  )
}

