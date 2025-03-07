import { useState,useEffect, useCallback } from "react";
import { UseContextApp } from "../context/AppContext";
export const useFindTickets =()=>{
  const {findTickets} = UseContextApp();
  const [ticketsFinds,setTicketsFinds] = useState([]);
  const [error,setError] = useState(null);

  const findTicketsData = useCallback(async(value)=>{
    try {
      const res = await findTickets(value);
      setTicketsFinds(res);
    } catch (error) {
      setError(error);
    }
  },[])

  return {
    ticketsFinds,
    setTicketsFinds,
    findTicketsData,
    error
  }
}