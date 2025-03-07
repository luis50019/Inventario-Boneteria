import React, { useEffect, useState } from 'react';
import { FaPrint } from "react-icons/fa6";
import SpinerCircle from '../UI/SpinerCircle.jsx';
import { UseContextApp } from '../../context/AppContext.jsx';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDF from '../UI/PDF.jsx';

export default function GeneratePDF() {
  const { getProducts,isNewProduct,setIsNewProduct } = UseContextApp();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  async function fetchInventoryData() {
    try {
      setError("");
      setIsLoading(true);
      const res = await getProducts();

      if (!res || !res.allProducts) {
        throw new Error("No se encontraron productos");
      }

      setProducts(res.allProducts);
    } catch (error) {
      setError("Error al generar el PDF");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if(products.length===0){
      fetchInventoryData();
    }
  }, []);
  useEffect(()=>{
    fetchInventoryData();
    setIsNewProduct(false)
  },[isNewProduct])

  return (
    <>
      {error && <p className="text-red-500">{error}</p>}

      {!isLoading ? (
        <PDFDownloadLink document={<PDF products={products} />} fileName="Reporte_de_inventario.pdf">
          {({ loading }) => 
            loading ? <SpinerCircle/>: <FaPrint className='text-3xl'/>
          }
        </PDFDownloadLink>
      ) : (
        <SpinerCircle/>
      )}
    </>
  );
}
