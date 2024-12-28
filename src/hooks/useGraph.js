import { UseContextApp } from "../context/AppContext";
import { useState, useEffect } from "react";

export const useGraph = () => {
  const { getStadistics } = UseContextApp();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [isLoadingGraph, setIsLoadingGraph] = useState(true);
	const [errorGraph,setErrorGraph] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingGraph(true);
        const dataStadistic = await getStadistics();
        setChartData(dataStadistic);
      } catch (e) {
        setErrorGraph(e);
      }finally{
				setIsLoadingGraph(false);
			}
    };
    fetchData();
  }, []);
  return { chartData, isLoadingGraph,errorGraph };
};
