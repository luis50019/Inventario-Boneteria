import { useCallback,useState } from "react"
import {UseContextApp} from "../context/AppContext";
export const useFindProduct =()=>{
  const {findProductsByName} = UseContextApp();
  const [productsFind,setProductsFind] = useState([]);

  const getProductsByName = useCallback(async(name)=>{
    try{
      const products = await findProductsByName(name);
      setProductsFind(products);
    }catch(error){
      return error;
    }
  },[])
  
  return{
    productsFind,
    setProductsFind,
    getProductsByName,
  }

}