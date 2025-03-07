import { useEffect,useState } from "react";
import { useSaleContext } from "../context/SaleContext.jsx";
import CardSale from "../components/Cards/CardSale.jsx";
import {Search} from "../components/UI/Search.jsx";
import {IoIosAdd} from "react-icons/io";
import { useNavigate } from "react-router";
import { useFindTickets } from "../hooks/useFindTickets.js";

export default function Sale() {

  const {getAllSales} = useSaleContext();
  const [sales,setSales] = useState([]);
  const [errorSales,setErrorSales] = useState();
  const navigate = useNavigate();
  const {findTicketsData,ticketsFinds,setTicketsFinds} = useFindTickets();

  useEffect(()=>{
    async function getSales(){
      try {
        const res = await getAllSales();
        setSales(res);
      } catch (error) {
        setErrorSales(error);
      }
    }
    getSales();
  },[])

  const handlerSelectTicket = (idTicket)=>{
    setTicketsFinds([]);
    navigate(`/sale/${idTicket}`);
  }

  const handlerNavigate =()=>{
    navigate('/sale/newSale');
  }
  /* 
    TODO: programar la barra de busqueda modificar este componente para que 
    reciba un componente y a este le pasemos los valores encontradas y el se encarge en mostrarlos
  
  */
  return (
    <>
      <Search getData={findTicketsData} data={ticketsFinds} selectProduct={handlerSelectTicket} key={"tickets"} placeholder='numero de ticket o fecha' />
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-left mt-2">Ventas</h1>
        <button onClick={handlerNavigate} className="bg-[#fff]">
            <IoIosAdd className="font-extrabold text-4xl" />
        </button>
      </div>
      <div className="flex flex-col gap-5 min-h-100vh">
        {
          sales.map((sale,index)=>(
            <CardSale key={index} date={sale.saleDate} idTicket={sale._id} total={sale.total} />
          ))
        }
      </div>
    </>
  );
}
