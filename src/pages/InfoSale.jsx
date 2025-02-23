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
     <div className="flex flex-col gap-5 min-h-[80vh]">
        <h2>Ticket: #1</h2>
        <h2 className="text-2xl font-bold">Producto vendidos</h2>
        {sale&&(sale.details.map((product)=>(
          <CardClothingSale 
          key={product.productName}
          discount={product.discount}
          nameClothing={product.product.productName}
          numberClothings={product.totalSoldAmount}
          priceDozen={product.dozenPrice}
          priceUnit={product.unitPrice}
          size={product.size.size || ""}
          total={product.subTotal}
          />
        )))}

      </div>
    </>
  );
}
