import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Search } from "../components/UI/Search";
import Input from "../components/UI/Input";
import { MdCancel } from "react-icons/md";
import { useFindProduct } from "../hooks/useFindProduct";
export default function AddSale({addProductToList,closeModal,productToUpdate = null }) {
  const {getProductsByName,productsFind} = useFindProduct();
  const [productSelect, setProductSelect] = useState(null);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const valueUnits = watch("units");
  const valueDozen = watch("dozen");

  useEffect(()=>{
    const units = parseInt(valueUnits) || 0 ;
    const dozen = parseInt(valueDozen) || 0;
    const totalUnits = units+(dozen*12);

    if(!productSelect) return;
    console.log("pas")

    if(totalUnits > parseInt(productSelect)){
      setError("No hay suficientes prendas en existencia");
      return ;
    }

    const discountedUnitPrice = parseFloat(productSelect.unitPrice) * (1 - parseFloat(productSelect.discount) / 100);
    const discountedDozenPrice = parseFloat(productSelect.dozenPrice) * (1 - parseFloat(productSelect.discount) / 100);
    const valueTotal = parseFloat((discountedDozenPrice*dozen) + (discountedUnitPrice*units));
    setTotal(valueTotal);
    setError("")

  },[valueUnits,valueDozen])

  const handlerOnSubmit = (data) => {
    const units = parseInt(data.units);
    const dozen = parseInt(data.dozen);
    const totalUnits = units+(dozen*12);

    if(totalUnits == 0){
      setError("No se puede vender 0 prendas");
      return
    }

    if(parseInt(productSelect.availableUnits)<totalUnits){
      setError("No hay suficientes prendas en existencia");
      return;
    }
    const newProduct ={
      pieceQuantity: units,
      productName: productSelect.productName,
      discount: productSelect.discount,
      size: productSelect.size[0],
      totalSoldAmount: totalUnits,
      quantityDozens: dozen,
      productId: productSelect._id,
      subTotal:total,
      availableUnits:productSelect.availableUnits
    }
    setError("");
    addProductToList(newProduct,total,productToUpdate);
    setTotal(0);
    setProductSelect(null)
    setIsDisabled(true)
    closeModal();

  };

  useEffect(()=>{
    setValue("units",0);
    setValue("dozen",0)
  },[])

  useEffect(() => {
    async function GetProductToUpdate (name){
      try{
        await getProductsByName(name);
        setProductSelect(productsFind[0]);
      }catch(error){
        console.log(error);

      }
    }
    if(productToUpdate !== null && productSelect ==null){
      setIsDisabled(false);
      setValue("productName",productToUpdate.productName);
      setValue("size",productToUpdate.size);
      setValue("units",productToUpdate.pieceQuantity);
      setValue("dozen",productToUpdate.quantityDozens);
      setTotal(productToUpdate.subTotal);
      GetProductToUpdate(productToUpdate.productName);
      console.log("hola soy yo")
      return ;
    }

    if (productSelect) {
      setIsDisabled(false);
      setValue("productName", productSelect.productName);
      setValue("size",productSelect.size[0]);
      return;
    } else {
      setIsDisabled(true);
      setValue("productName", "");
      setValue("size","");
      return;
    }

  },[productSelect,productToUpdate])

  const handlerCancel =()=>{
    setProductSelect(null);
    setError("")
  }

  /*

    TODO: validar los dos input
    TODO: al salir del modal borrar el valor del estado

  */
  return (
    <>
      <div className="z-20 absolute left-0 top-0 flex items-center justify-center min-w-[100vw] min-h-[54rem] border-2 max-w-[100vw] bg-[#00000069]">
        <div className="min-h-[38rem] relative max-h-[40rem] overflow-y-auto min-w-[22rem] px-1 py-2 border-2 bg-[#fff] flex flex-col justify-start items-center rounded-xl ">
          <div className="w-full px-1 text-left" onClick={closeModal}>
          <MdCancel className="text-4xl" />
          </div>
          <span className="block text-left w-full pl-[1rem] text-3xl font-extrabold text-title">
            Datos del producto
          </span>
          <Search
            placeholder={"Producto a buscar"}
            selectProduct={setProductSelect}
          />
          <form
            onSubmit={handleSubmit(handlerOnSubmit)}
            className="flex flex-col justify-start w-full px-[1rem]"
          >
            <Input
              name={"name"}
              label={"Nombre del producto"}
              type="text"
              register={{ ...register("productName") }}
              inputDisabled={true}
            />
            <Input
              name={"size"}
              label={"talla del producto"}
              type="text"
              register={{ ...register("size") }}
              inputDisabled={true}
            />
            <span>Prendas vendidas por:</span>
            <div className="grid grid-cols-2 gap-3">
            <Input
              name={"units"}
              label={"Pieza"}
              type="number"
              register={{
                ...register("units"),
                min: {
                  value: 0,
                  message:
                    "El numero de piezas debe de ser igual o mayor a cero",
                },
              }}
              errorValue={errors.units?.message}
              inputDisabled={isDisabled}
            />
            <Input
              name={"dozen"}
              label={"Docena"}
              type="number"
              register={{
                ...register("dozen"),
                required: "El precio de compra es obligatorio",
                min: {
                  value: 0,
                  message:
                    "El precio de compra debe de ser igual o mayor a cero",
                },
              }}
              errorValue={errors.dozen?.message}
              inputDisabled={isDisabled}
            />
            </div>
            <div className="flex gap-5 min-h-[2rem] max-h-[2rem]">
              {
                productSelect&& productSelect.discount>=1?(
                  <>
                    <input type="checkbox" name="discount" {...register("discount")} disabled={isDisabled} />
                    <label>Aplicar descuento</label>
                  </>
                  ):""
              }
            </div>
            <div className="flex justify-between">
              <span>Total</span>
              <span>${total  }</span>
            </div>
            <span className="min-h-10 text-[#f00]">{error}</span>
            <button className={`${!isDisabled?'bg-[#b93131] rounded-lg text-[#fff]':'bg-title rounded-lg text-[#fff]'} font-bold py-2`}>Confirmar</button>
            <button onClick={handlerCancel} className="bg-[#ff4c0b] py-2 mt-2 text-[#fff] font-bold rounded-lg">Cancelar</button>
          </form>
        </div>
      </div>
    </>
  );
}
