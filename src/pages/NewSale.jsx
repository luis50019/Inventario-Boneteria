import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CardClothingSale from "../components/Cards/CardClothingSale";
import { useSaleContext } from "../context/SaleContext";
import ModalAddSale from "./ModalAddSale";
import { FaArrowLeft } from "react-icons/fa";

export default function NewSale() {
  const {products,total,resetValues,addProduct,error,setError,deleteProduct,registerNewSale} = useSaleContext();
  const [productSelect,setProductSelect] = useState(null);
  const [modalVisible,setModalVisible] = useState(false);
  const [saleValidate,setSaleValidate] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    if(products.length>0){
      setSaleValidate(true)
    }
    setProductSelect(null)
  },[products])

  const handlerNavigate =(e)=>{
    e.preventDefault();
    setModalVisible(true);
  }
  const handlerClick =(product)=>{
    setModalVisible(true);
    setProductSelect(product)
  }

  const handlerOnSubmit =async (e)=>{
    e.preventDefault();
    try{

      if(products.length<=0) return ;

      const data = new Object();
      const dateSale = new Date();
      data.typeSale = "Oficial";
      data.total = total;
      data.date = dateSale.getUTCFullYear()+"-"+(dateSale.getUTCMonth()+1)+"-"+dateSale.getUTCDate();
      data.products=[]

      products.forEach((product)=>{
        const newProduct = new Object();
        newProduct.pieceQuantity = product.pieceQuantity;
        newProduct.quantityDozens = product.quantityDozens;
        newProduct.productId = product.productId;
        data.products.push(newProduct)
      })

      console.log(data)

      if(data){
        const res = await registerNewSale(data);
        if(res){
          resetValues();
          navigate("/sale")
          return
        }else{
          setError("Error al enviar la data")
        }
      }
       
    }catch(error){
      console.log(error)
    }
  }

  const handlerCloseModal = ()=>{
    setModalVisible(false)
    setProductSelect(null)
  }

  return (
    <>
      <div className="min-h-[80vh] max-h-[100vh] flex flex-col pr-2 justify-between">
        {
          modalVisible&&(<ModalAddSale closeModal={handlerCloseModal} addProductToList={addProduct} productToUpdate={productSelect} />)
        } 
        {
          error.product&&(<div className="z-20 absolute left-0 top-0 flex items-center justify-center min-w-[100vw] min-h-[50rem] border-2 max-w-[100vw] bg-[#00000069]">
            <div className="flex flex-col gap-4 bg-[#fff] p-4 rounded-lg">
              <h2 className="text-[#940c0c] text-2xl">Error</h2>
              <span className="font-extrabold text-xl text-title">{error.product}</span>
              <span>{error.message}</span>
              <button onClick={()=>setError({})} className="bg-[#2B1B42] py-2 rounded-lg text-[#fff] font-bold">
                Aceptar
              </button>
            </div>
          </div>)
        }
        <div className="flex gap-5">
          <FaArrowLeft className="text-3xl"
                onClick={() => {
                  resetValues();
                  navigate("/sale");
                }}
              />
          <h2 className="text-title text-2xl">Productos vendidos</h2>
        </div>


        <div className="flex flex-col gap-4 overflow-y-auto min-h-[25rem] max-h-[25rem] pt-1">
          {products.length?
            products.map((product,index) => (
              <CardClothingSale
                key={product.index}
                product={product}
                functionSelectProduct={handlerClick}
                functionToDeleteProduct={deleteProduct}
              />
            )):(<span className="text-[#2B1B42] text-center text-xl block pt-5">No hay productos vendidos</span>)
          }
        </div>

        <form onSubmit={handlerOnSubmit} className="min-h-24 flex flex-col gap-5">
          <div className="w-full flex justify-between px-2">
            <span className="text-lg font-bold">TOTAL</span>
            <span className="text-lg font-extralight">${total}</span>
          </div>
          <button onClick={handlerNavigate} className="bg-[#2B1B42] py-2 rounded-lg text-[#fff] font-bold">
            Añadir productos
          </button>
          <button className={`${saleValidate?"bg-[#F78C94] ":"bg-[#720a11]"} py-2 rounded-lg text-[#fff] font-bold`} disabled={!saleValidate}>
            Confirmar Venta
          </button>
          
        </form>
      </div>
    </>
  );
}
