import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CardClothingSale from "../components/Cards/CardClothingSale";
import { useSaleContext } from "../context/SaleContext";
import AddSale from "./AddSale";
export default function NewSale() {
  const {products,total,addProduct,error,setError,deleteProduct} = useSaleContext();
  const [productSelect,setProductSelect] = useState(null);
  const [modalVisible,setModalVisible] = useState(false);
  const [saleValidate,setSaleValidate] = useState(false);

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

  const handlerCloseModal = ()=>{
    setModalVisible(false)
    setProductSelect(null)
  }
  // Todo:
  //cambiar el AddSale a un modal para que de esta forma mantengamos un solo estado local y no usar el contexto -- listo
  // el modal se debe de abrir al dar click al boton añadir al inventario -- listo
  // el modal se debe de abrir al seleccionar un CardClothingSale -- listo
  // el modal se debe de cerrar al dar click en el boton de cerrar y eliminar el valor del producto seleccionado para actualizar --listo
  // agregar un modal para eliminar el un producto de la lista  -- listo

  // TODO: darle funcion al boton de confirmar venta para que se actualice el total y se elimine el producto de la lista -- pendiente
  // TODO: reiniciar los valores al confirmar la venta
  //
  return (
    <>
      <div className="min-h-[35rem] max-h-[35rem] flex flex-col pr-2 justify-between">
        {
          modalVisible&&(<AddSale closeModal={handlerCloseModal} addProductToList={addProduct} productToUpdate={productSelect} />)
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
        <div>
          <h2 className="text-title text-2xl">Productos vendidos</h2>
        </div>

        <div className="flex flex-col gap-4 overflow-y-auto min-h-[25rem] max-h-[25rem] pt-1">
          {products.length?
            products.map((product) => (
              <CardClothingSale
                key={product.index}
                product={product}
                functionSelectProduct={handlerClick}
                functionToDeleteProduct={deleteProduct}
              />
            )):(<span className="text-[#2B1B42] text-center text-xl block pt-5">No hay productos vendidos</span>)
          }
        </div>

        <form className="min-h-24 flex flex-col gap-5">
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
