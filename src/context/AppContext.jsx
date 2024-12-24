import { createContext, useContext, useState } from "react";
import { getStadisticGeneral, InfoInventary } from "../api/statistics.js";
const AppContext = createContext(); 

export const UseContextApp = ()=> useContext(AppContext);

export function AppProvider({children}){

  const [isLoading,setLoading] = useState(false);
  const [error,setError] = useState(null);

  const getStadistics = async ()=>{
    try {
      setLoading(true);
      const data = await getStadisticGeneral();
      
      return data.data
      
    } catch (error) {
      setError(error);
    }finally{
      setLoading(false);
    }
  }

  const getInfoInventary = async ()=>{
    try {
      setLoading(true);
      const data = await InfoInventary();
      console.log(data);
      return data.data[0];
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }

  return(
    <AppContext.Provider value={{
      getStadistics,
      getInfoInventary,
      isLoading
    }}>
      {children}
    </AppContext.Provider>
  )
}

