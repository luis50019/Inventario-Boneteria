import { useEffect,useState } from "react";
import { useSaleContext } from "../context/SaleContext.jsx";
import CardSale from "../components/Cards/CardSale.jsx";
import {Search} from "../components/UI/Search.jsx";
import {IoIosAdd} from "react-icons/io";
import { useNavigate } from "react-router";

export default function Sale() {

  const {getAllSales} = useSaleContext();
  const [sales,setSales] = useState([]);
  const [errorSales,setErrorSales] = useState();
  const navigate = useNavigate();
  useEffect(()=>{
    async function getSales(){
      try {
        const res = await getAllSales();
        console.log(res)
        setSales(res);
      } catch (error) {
        setErrorSales(error);
      }
    }
    getSales();
  },[])

  const handlerNavigate =()=>{
    navigate('/sale/newSale');
  }

  return (
    <>
      <Search placeholder='numero de ticket o fecha' />
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
