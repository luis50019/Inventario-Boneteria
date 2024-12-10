import { createContext, useContext, useState } from "react";
import { getStadisticGeneral } from "../api/statistics";
const AppContext = createContext(); 

export const UseContextApp = ()=> useContext(AppContext);

export function AppProvider({children}){

  const [data,setData] = useState({});
  const [isLoading,setLoading] = useState(true);

  const getStadistics = async ()=>{
    try {
      const res = await getStadisticGeneral();
      setData(res.data)
      
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }

  return(
    <AppContext.Provider value={{
      getStadistics,
      data,
      isLoading
    }}>
      {children}
    </AppContext.Provider>

  )
}

