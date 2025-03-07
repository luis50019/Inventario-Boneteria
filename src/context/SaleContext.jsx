import { createContext,useContext,useState } from "react";
import { getSales,getSaleById,newSale } from "../api/sales";

const contextSales = createContext();

export const useSaleContext = () => {
  const context = useContext(contextSales)
  if(!context) return null;
  return context;
};

const SaleProvider =({children}) => {

  
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading,setLoading] = useState(false);
  const [error, setError] = useState({});
  const addProduct = (newProduct, subTotal,updateProduct = null) => {

    //validar que el producto no exista
    const productIndex = products.findIndex((product) => product.productId === newProduct.productId);
    if(productIndex !== -1 && updateProduct == null){
      setError({product:newProduct.productName,message:"Este producto ya esta en el ticket"});
      return ;
    }

    const newProducts = [...products];
    let newTotal = 0;
    if(updateProduct){
      newProducts[productIndex] = newProduct;
      newTotal = (total - parseFloat(updateProduct.subTotal)) + subTotal;
    }else{
      newProducts.push(newProduct);
      newTotal = parseFloat(total+ subTotal);
    }
    
    setTotal(parseFloat(newTotal)||0);
    setProducts(newProducts);
  };

  const registerNewSale =async (data)=>{
    try{
      setLoading(true);
      const res = await newSale(data);
      return res;
    }catch(error){
      setError(error);
      return error;
    }finally{
      setLoading(false);
    }
  }

  const deleteProduct =(id,subTotal)=>{
    const productsToFilter = [...products];
    const newProducts = productsToFilter.filter((product)=>product.productId!=id);
    const newTotal = total - subTotal;
    setTotal(newTotal);
    setProducts(newProducts) 
  }
  const resetValues =()=>{
    setProducts([]);
    setError("");
    setTotal(0);
  }

  const getAllSales = async ()=>{
    try {
      const res = await getSales();
      return res.data;
    } catch (error) {
      return error;
    }
  }

  const getSalesById = async (id) => {
    try {
      const res = await getSaleById(id);
      return res.data;
    } catch (error) {
      return error;
    }
  }

  return(
    <contextSales.Provider value={{
      getAllSales,
      getSalesById,
      deleteProduct,
      setError,
      registerNewSale,
      addProduct,
      resetValues,
      products,
      total,
      error
      }}>
      {children}
    </contextSales.Provider>
  )
}
export default SaleProvider;

