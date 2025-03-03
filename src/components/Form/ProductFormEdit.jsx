import "../../styles/Input.css";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useCategory } from "../../hooks/useCategory";
import { useSizes } from "../../hooks/useSizes";
import useGenders from "../../hooks/useGenders";
import Input from "../UI/Input";
import InputSelect from "../UI/InputSelect";
import ContImg from "../Layout/ContImg";
import useCloudinary from "../../hooks/useCloudinary";
import { useProductContext } from "../../context/ProductContex";
// # componente unicamente para agregar productos
export default function ProductFormEdit({ productSelect }) {
  const { editProduct, deleteProduct } = useProductContext();
  const [isActiveButton,setIsActiveButton] = useState(false);
  const [srcOptional,setSrcOptional] = useState(null);
  const [errorProduct, setErrorProduct] = useState("");
  const [producto, setProduct] = useState(productSelect);
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorImgExist, setErroImgExist] = useState();
  const [captureImg, setCaptureImg] = useState({
    img: [],
    imgLocal: [],
    opcion: "noExist",
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { updateImage } = useCloudinary();
  const optionCategorySelect = watch("category");
  const { categories } = useCategory();
  const { sizes, setCategorySelect } = useSizes();
  const { genders } = useGenders();
  const selectImg = (img, imgLocal, opcion) => setCaptureImg({ img: img, imgLocal: imgLocal, opcion: opcion });

  // codigo para tomar la foto

  useEffect(() => {
    setCategorySelect(optionCategorySelect);
  }, [optionCategorySelect]);

  useEffect(() => {
    if (producto && isDisabled) {
      setValue("productName", producto[0].productName);
      setValue("category", producto[0].category._id);
      setValue("size", producto[0].garment.size._id);
      setValue("purchasePrice", producto[0].purchasePrice || 0);
      setValue("unitPrice", producto[0].unitPrice || 0);
      setValue("dozenPrice", producto[0].dozenPrice || 0);
      setValue("availableUnits", producto[0].availableUnits || 0);
      setValue("discount", producto[0].discount || 0);
      setValue("targetGender", producto[0].garment.intendedGender._id);
      selectImg(producto[0].images[0], producto[0].images[0], "img");
      setSrcOptional({img:producto[0].images[0],imgLocal:producto[0].images[0],opcion:"img"})
    }
    if (sizes.length == 0) {
      setCategorySelect(producto[0].category._id);
    }
  }, [producto, setValue, categories, sizes]);

  const deleteItem = async(id) => {
    try{
			const res = await deleteProduct(id);
    	navigate("/Inventary");
		}catch(error){
			setErrorProduct("Erro al eliminar el producto, vuelva a intentarlo en un rato")
		}
  };

  //handler cancel
  const handlerCancel=()=>{
    setIsDisabled(true);
    setErrorProduct(null);
    setCaptureImg({...srcOptional})
    setValue("availableUnits", producto[0].availableUnits);
  }
  // funcion para mandar los datos
  const onSubmit = async (data) => {
    if (isDisabled) {
      setIsDisabled(false);
      setValue("availableUnits", 0);
      return;
    }

    const formData = new FormData();
    formData.append("file", captureImg.img);
    formData.append("upload_preset", "prubaImagenes");

    try {
      setIsDisabled(true)
      setIsActiveButton(true)
      if(!captureImg.img){
        setErroImgExist("Debe de seleccionar una imagen");
        return;
      }

      const imgCld = await updateImage(formData);
      data.availableUnits = parseInt(data.availableUnits) + producto[0].availableUnits;
      data.dozenPrice = parseFloat(data.dozenPrice);
      data.purchasePrice = parseFloat(data.purchasePrice);
      data.unitPrice = parseFloat(data.unitPrice);
      data.discount = parseFloat(data.discount);
      data.isSecondHand = data.isSecondHand == "yes";
      data.ImageUrl = [imgCld.secure_url];

      const res = await editProduct(producto[0]._id, data);
      if (res.status === 200) {
        navigate("/Inventary");
      }
      if (res.status == 406) {
        setErrorProduct(res.response.data);
      }
    } catch (e) {
      console.error("Advertencia algo sucedio");
    }
  };

  // codigo para vereficar el tipo de operacion que se ralizara
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-5 pl-2 flex flex-col gap-5 min-h-auto pb-32 items-start capitalize"
    >
      <ContImg
        setCaptureImg={selectImg}
        img={captureImg}
        isDisabled={isDisabled}
      />

      <Input
        label="Nombre del producto"
        nameInput="nameProduct"
        type="text"
        register={{
          ...register("productName", {
            required: "El nombre del producto es obligatorio",
            minLength: {
              value: 5,
              message: "Debe de tener al menos 5 caracteres ",
            },
            maxLength: {
              value: 100,
              message:
                "El nombre del producto debe de tener menos de 100 caracteres ",
            },
            pattern: {
              value: /^[a-zA-Z0-9 ]+$/,
              message:
                "El nombre del producto solo puede contener letras y numeros ",
            },
          }),
        }}
        errorValue={errors.productName?.message}
        InputRequiered={true}
        inputDisabled={isDisabled}
      />
      <InputSelect
        label="categoria"
        nameInput="category"
        isDisabled={isDisabled}
        register={{
          ...register("category", {
            required: "Debe seleccionar una categoria",
          }),
        }}
        message="Selecciona una categoria"
        options={categories}
        errorValue={errors.category?.message}
      />

      <InputSelect
        label="Tallas"
        nameInput="size"
        isDisabled={isDisabled}
        register={{
          ...register("size", {
            required: "Debe seleccionar una talla",
          }),
        }}
        message="Talla"
        options={sizes}
        errorValue={errors.size?.message}
      />
      <div className="flex flex-col gap-[5px] min-w-full max-w-full">
        <label className="text-2xl text-[#2B1B42] font-extrabold">
          Precio De:
        </label>
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Compra"
            nameInput="purchase"
            type="number"
            register={{
              ...register("purchasePrice", {
                required: "El precio de compra es obligatorio",
                min: {
                  value: 0,
                  message:
                    "El precio de compra debe de ser igual o mayor a cero",
                },
              }),
            }}
            errorValue={errors.purchasePrice?.message}
            InputRequiered={true}
            inputDisabled={isDisabled}
          />
        </div>
      </div>
      <div className="flex flex-col gap-[5px] min-w-full max-w-full">
        <label className="text-2xl text-[#2B1B42] font-extrabold">
          Precio Por:
        </label>
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Unidad"
            nameInput="unit"
            type="number"
            register={{
              ...register("unitPrice", {
                required: "El precio por unidad es obligatorio",
                min: {
                  value: 1,
                  message: "El precio debe de ser igual o mayor a cero",
                },
              }),
            }}
            errorValue={errors.unitPrice?.message}
            InputRequiered={true}
            inputDisabled={isDisabled}
          />
          <Input
            label="Docena"
            nameInput="dozen"
            type="number"
            register={{
              ...register("dozenPrice", {
                required: "El valor por decena es obligatorio",
                min: {
                  value: 1,
                  message: "El precio debe de ser igual o mayor a cero",
                },
              }),
            }}
            errorValue={errors.dozenPrice?.message}
            InputRequiered={true}
            inputDisabled={isDisabled}
          />
        </div>
      </div>
      <div className="w-[50%]">
        <Input
          label="Unidades adquiridas"
          nameInput="availableUnits"
          type="number"
          register={{
            ...register("availableUnits", {
              required: "Las unidades adqueridas es obligatorio",
              min: {
                value: 1,
                message: "El valor debe ser igual o mayor a 1",
              },
            }),
          }}
          errorValue={errors.availableUnits?.message}
          InputRequiered={true}
          inputDisabled={isDisabled}
        />
      </div>
      <div className="w-[50%]">
        <Input
          label="Descuento"
          nameInput="discount"
          type="number"
          register={{
            ...register("discount", {
              required: "El descuento puede ser igual o mayor a 0",
              min: {
                value: 0,
                message: "El descuento debe de ser igual o mayor a cero",
              },
            }),
          }}
          errorValue={errors.discount?.message}
          InputRequiered={true}
          inputDisabled={isDisabled}
        />
      </div>
      {sizes.length !== 0 && (
        <>
          <InputSelect
            label="Genero"
            nameInput="gender"
            isDisabled={isDisabled}
            register={{
              ...register("targetGender", {
                required: "El genero es obligatorio",
              }),
            }}
            errorValue={errors.gender?.message}
            options={genders}
          />
        </>
      )}
      <span className="text-sm text-[#f00] normal-case font-light min-h-6 max-h-6">
        { errorImgExist? errorImgExist:""}
      </span>
      {errorProduct && <span className="text-[#f00]">{errorProduct}</span>}
      <button
        type="submit"
        disabled={isActiveButton}
        className={`${!isActiveButton?"bg-[#2B1B42]":"bg-[#0b0613bb]"} rounded-xl text-white font-extrabold text-2xl w-full text-[#fff] h-10`}
      >
        {isDisabled ? "Editar producto" : "Confirmar cambios"}
      </button>
      {!isDisabled && (
        <>
          <button
            type="button"
            onClick={() => deleteItem(producto[0]._id)}
            className="bg-[#f21515] rounded-xl text-white font-extrabold text-2xl w-full text-[#fff] h-10"
          >
            Eliminar producto
          </button>
          <button
            type="button"
            onClick={handlerCancel}
            className="bg-[#f29a15] rounded-xl text-white font-extrabold text-2xl w-full text-[#fff] h-10"
          >
            Cancelar
          </button>
        </>
      )}
    </form>
  );
}
