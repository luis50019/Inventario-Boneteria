import { useCallback,useState } from "react"
import {UseContextApp} from "../context/AppContext";
export const useFindProduct =()=>{
  const {findProductsByName} = UseContextApp();
  const [productsFind,setProductsFind] = useState([]);

  const getProductsByName = useCallback(async(name)=>{
    try{
      const products = await findProductsByName(name);
      console.log(products)
      setProductsFind(products);
    }catch(error){
      console.log(error);

    }
  },[])
  
  return{
    productsFind,
    setProductsFind,
    getProductsByName,
  }

}