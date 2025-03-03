import { useEffect,useState } from "react";
import { useParams } from "react-router";
import { useSaleContext } from "../context/SaleContext";
import CardClothingSale from "../components/Cards/CardClothingSale";

export default function InfoSale() {
  const {id} = useParams();
  const {getSalesById} = useSaleContext();
  const [sale, setSale] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(()=>{
    async function getSale(){
      try {
        const res = await getSalesById(id);
        console.log(res)
        setSale(res);
      } catch (error) {
        setError(error);
      }finally{
        setLoading(false);
      }
    }
    getSale();
  },[])

  return (
    <>
     <div className="flex pr-3 flex-col gap-5 min-h-[80vh]">
        <h2>Ticket: #{sale?.ticketNumber}</h2>
        <h2 className="text-2xl font-bold">Producto vendidos</h2>
        <div className="grid w-full place-self-center grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
          {sale&&(sale.details.map((product,index)=>(
            <CardClothingSale
            key={index}
            product={product}
            />
          )))}
        </div>

      </div>
    </>
  );
}
