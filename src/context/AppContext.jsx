import { createContext, useCallback, useContext, useState } from "react";
import { getStadisticGeneral, InfoInventary } from "../api/statistics.js";
import {getAllProducts, getTopProducts,getProductsAboutToEnd,getProductSpecific,addProduct,getProductsByName} from '../api/products.js'
import { findTicket } from "../api/sales.js";
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
        console.log(data.data)
        return data.data;
      }else{
        return []
      }
    } catch (error) {
      setError('Hubo un error al cargar los productos');
    }finally{
      setLoading(false);
    }
  })

  const findTickets = useCallback(async (value)=>{
    try {
      setLoading(true);
      let data = [];
      if(value.match(/[-\/]/g)){
        data = await findTicket("saleDate",value);
        return data.data;
      }
      data = await findTicket("ticketNumber",value);
      return data.data;
    } catch (error) {
      return error;      
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
      findTickets,
      isLoading,
      error
    }}>
      {children}
    </AppContext.Provider>
  )
}

