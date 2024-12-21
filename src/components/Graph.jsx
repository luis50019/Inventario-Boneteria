import { UseContextApp } from "../context/AppContext";
import { Bar } from "react-chartjs-2";
import { options } from "../utils/barChartData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export function Graph() {
  const { getStadistics } = UseContextApp();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataStadistic = await getStadistics();
        console.log(dataStadistic);
        setChartData({
          labels: [dataStadistic[0].lastSale] || ["Miercoles"],
          datasets: [
            {
              data: [dataStadistic[0].totalProfit] || [100],
              backgroundColor: "rgb(0,0,0)",
            },
          ],
        });
        setIsLoading(false);
      } catch (e) {
        console.error("Error fetching statistics:", e);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [getStadistics]);

  return (
    <>
      <div className="mt-10 ml-2 w-54">
        <h2 className="font-bold text-2xs">Resumen de ventas</h2>
        <p className="text-span max-w-full">
          Consulta el rendimiento de tus productos y ventas.
        </p>
      </div>
      <div className="cont-graph mt-3 h-80 max-h-80">
        {isLoading ? (
          <div>Cargando ...</div>
        ) : (
          <Bar options={options} data={chartData} />
        ) }
      </div>
    </>
  );
}
