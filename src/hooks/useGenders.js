import { useEffect, useState } from "react";
import { useProductContext } from "../context/ProductContex";
const useGenders = () => {
  const [genders, setGenders] = useState([]);
  const { getAllGender } = useProductContext();

  useEffect(()=>{
    async function getDataGenders(){
      try {
        const res = await getAllGender();
        console.log(res.data);
        setGenders(res);
      } catch (error) { 
        console.log(error);
      }
    }
    getDataGenders()
  },[]);

  return {genders}
};

export default useGenders;
