import { UseContextApp } from "../../context/AppContext";
import { Bar } from "react-chartjs-2";
import { options } from "../../utils/barChartData";
import { barData } from "../../utils/barChartData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { useGraph } from "../../hooks/useGraph";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export function Graph() {
  
  const {chartData,isLoadingGraph,errorGraph} = useGraph();
  return (
    <>
      <div className="mt-10 ml-2 w-54">
        <h2 className="font-bold text-2xs">Resumen de ventas</h2>
        <p className="text-span max-w-full">
          Consulta el rendimiento de tus productos y ventas.
        </p>
      </div>
      <div className="cont-graph mt-3 h-80 max-h-80">
        {isLoadingGraph ? (
          <div>Cargando Estadisticas ...</div>
        ) : errorGraph?<p>{errorGraph}</p>:(
          <Bar options={options} data={chartData} />
        ) }
      </div>
    </>
  );
}
