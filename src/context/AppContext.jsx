import { createContext, useContext, useState } from "react";
import { getStadisticGeneral } from "../api/statistics.js";
const AppContext = createContext(); 

export const UseContextApp = ()=> useContext(AppContext);

export function AppProvider({children}){

  const [isLoading,setLoading] = useState(false);

  const getStadistics = async ()=>{
    try {
      const res = await fetch("http://localhost:4000/stadisctic");
      const data = await  res.json();
      return data
      
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }

  return(
    <AppContext.Provider value={{
      getStadistics,
      isLoading
    }}>
      {children}
    </AppContext.Provider>

  )
}

