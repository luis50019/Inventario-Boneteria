import { UseContextApp } from "../context/AppContext.jsx";
import { useEffect, useState } from "react";

export const useInfoInventary = () => {

  const { getInfoInventary} = UseContextApp();
  const [InfoInventary, setInfoInventary] = useState([]);
	const [errorInfo, setErrorInfo] = useState(null);
	const [isLoadingInfo, setLoadingInfo] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
				setLoadingInfo(true);
        const data = await getInfoInventary();
        setInfoInventary(data);
      } catch (error) {
        setErrorInfo('Hubo un error al cargar la informacion del inventario');
      }finally{
				setLoadingInfo(false);
			}
			
    };
    fetchData();
  }, []);

	return { InfoInventary, errorInfo, isLoadingInfo };
};
