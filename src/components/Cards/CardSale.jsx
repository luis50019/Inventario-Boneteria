import { useEffect,useState } from "react"
import { useNavigate } from "react-router";
export default function CardSale({date,total,idTicket}){

  const [dateTicket, setDateTicket] = useState(date)
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/Sale/${idTicket}`)
  }


  useEffect(() => {
    const newDate = new Date(date).toLocaleDateString("es-MX");
    setDateTicket(newDate);
  }, [date])

  return(
    <>
      <div onClick={handleClick} className="w-full box-border flex justify-between items-center rounded-md px-4 shadow-lg min-h-24">
        <span className="font-bold h-full">{dateTicket}</span>
        <span className="font-extralight h-full">Total de venta:<span className="font-bold px-2">${total}</span> </span>
      </div>
    </>
  )

}
