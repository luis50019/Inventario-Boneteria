import { createContext, useContext } from "react";
const URL_BASE = 'h'
const AppContext = createContext(); 

export const UseContextApp = ()=> useContext(AppContext);

export function AppProvider({children}){

  const getStadistics = async ()=>{
    try {
      const res = await fetch("http://localhost:3030/stadisctic");
      const data = res.json();
      
    } catch (error) {
      console.log(error);
    }
  }



  return(
    <AppContext.Provider value={{valor:5}}>
      {children}
    </AppContext.Provider>

  )
}

