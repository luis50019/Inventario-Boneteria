import React, { useEffect } from "react";
import { MdDelete } from "react-icons/md";

export default function CardClothingSale({
  product,
  functionSelectProduct = null,
  functionToDeleteProduct = null
}) {

  const handlerClick =()=>{
    functionSelectProduct(product)
  }

  const handlerDelete = (e) => {
    e.stopPropagation(); // detiene la propagacion del evento y con aseguramos que solo se ejecute esta funcion y no la funcion de handlerClick();
    functionToDeleteProduct(product.productId,product.subTotal)
  }

  useEffect(() => {
    console.log(product);
  },[])

  return (
    <div onClick={handlerClick} className="flex flex-col justify-center w-full min-h-[12rem] max-h-[12rem] shadow-lg rounded-lg border-[#cecece] border-2 px-2 py-2">
      <div className="flex flex-col justify-between min-w-[100%] max-w-[100%]">
        <div className="flex flex-col min-h-[5rem]">
          <div className="flex w-full">
            <span className="text-2xl font-bold capitalize">{ product.productName || product.product.productName}</span>
            {
               functionToDeleteProduct &&(<MdDelete onClick={handlerDelete} className="text-4xl text-[#ff1414] ml-auto cursor-pointer" />)
            }
          </div>
          <span className="font-extralight">{product.size[0]}</span>
        </div>
      </div>

      <div className="flex flex-col justify-between min-w-[100%] max-w-[100%]">
        <div className="px-2 flex justify-between">
          <span className="text-sm font-extralight">Num.prendas</span>
          <span className="text-sm font-bold">{product.totalSoldAmount}</span>
        </div>
        {
          product.discountActive&&(<div className="px-2 flex justify-between">
            <span className="text-sm font-extralight">Descuento</span>
            <span className="text-sm font-bold">{product.discount}%</span>
          </div>)
        }
        {product.pieceQuantity >= 1 && (
          <div className="px-2 flex justify-between">
            <span className="text-sm font-extralight" >Precio unidad</span>
            <span className="text-sm font-bold">${product.unitPrice||0}</span>
          </div>
        )}
        {product.quantityDozens >=1 && (
          <div className="px-2 flex justify-between">
            <span className="text-sm font-extralight" >Precio Dozena</span>
            <span className="text-sm font-bold">${product.dozenPrice}</span>
          </div>
        )}
        <div className="px-2 flex justify-between">
          <span className="text-sm font-extrabold">Total</span>
          <span className="text-sm font-bold text-title">${product.subTotal}</span>
        </div>
      </div>
    </div>
  );
}
