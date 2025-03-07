import { useEffect, useState } from "react";
import { useProductContext } from "../context/ProductContex";
const useGenders = () => {
  const [genders, setGenders] = useState([]);
  const { getAllGender } = useProductContext();

  useEffect(()=>{
    async function getDataGenders(){
      try {
        const res = await getAllGender();
        setGenders(res);
      } catch (error) { 
        return error;
      }
    }
    getDataGenders()
  },[]);

  return {genders}
};

export default useGenders;
