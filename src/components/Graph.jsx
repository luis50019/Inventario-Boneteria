import { Bar } from 'react-chartjs-2'
import { barData, options } from '../utils/barChartData';
import { Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
 } from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
)

export function Graph(){
  
  return (
    <>
      <div className='mt-5 max-w-32'>
        <h2 className='font-bold text-xs'>Resumen de ventas</h2>
        <p className='text-span max-w-full'>Consulta el rendimiento de tus productos y ventas.</p>
      </div>
      <div className='cont-graph mt-3 h-64'>
        <Bar options={options} data={barData} />
      </div>
    </>
  );
}