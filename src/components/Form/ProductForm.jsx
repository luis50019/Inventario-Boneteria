import "../../styles/Input.css";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { UseContextApp } from "../../context/AppContext";
import { useCategory } from "../../hooks/useCategory";
import { useSizes } from "../../hooks/useSizes";
import useGenders from "../../hooks/useGenders";
import Input from "../UI/Input";
import InputSelect from "../UI/InputSelect";
import ContImg from "../Layout/ContImg";
import useCloudinary from "../../hooks/useCloudinary";
import Spiner from "../UI/Spiner";
// # componente unicamente para agregar productos
export default function ProductForm() {
  const { addProductToInventary,isLoading } = UseContextApp();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const optionCategorySelect = watch("category");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isActiveButton, setIsActiveButton] = useState(true);
  const [captureImg, setCaptureImg] = useState({img: [],imgLocal: [],opcion: ""});
  const { updateImage } = useCloudinary();
  const { categories } = useCategory();
  const { sizes, setCategorySelect } = useSizes();
  const { genders } = useGenders();
  const [erroImgExist,setErroImgExist] = useState();

  useEffect(() => {
    setCategorySelect(optionCategorySelect)
  }, [optionCategorySelect]);

  // funcion para mandar los datos
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", captureImg.img);
    formData.append("upload_preset", "prubaImagenes");
    try {

      if(captureImg.img.length == 0 ){
        setErroImgExist("Debes de cargar una imagen");
        return ;
      }
      setIsDisabled(true)
      setIsActiveButton(false);
      
      const imgCld = await updateImage(formData);
      data.availableUnits = parseInt(data.availableUnits);
      // the error this is when parse the variable to two decimal
      data.dozenPrice = parseFloat(parseFloat(data.dozenPrice).toFixed(2));
      data.purchasePrice = parseFloat(parseFloat(data.purchasePrice).toFixed(2));
      data.unitPrice = parseFloat(parseFloat(data.unitPrice).toFixed(2));
      data.discount = parseFloat(data.discount);
      data.isSecondHand = data.isSecondHand == "yes";
      data.ImageUrl = [imgCld.secure_url];

      const res = await addProductToInventary(data);
      if (res) {
        navigate("/Inventary");
      }
    } catch (e) {
      setErroImgExist("Error al registrar el producto");
    }
  };
  // codigo para tomar la foto
  const selectImg = (img, imgLocal, opcion) => {
    setCaptureImg({
      img: img,
      imgLocal: imgLocal,
      opcion: opcion,
    });
  };

  return (
    <>
      {
        isLoading&&(<Spiner/>)
      }
      <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-5 pl-2 flex flex-col gap-5 min-h-auto pb-32 items-start capitalize"
    >
      <ContImg setCaptureImg={selectImg} img={captureImg} isDisabled={isDisabled} />

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
              value: /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]+$/,
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

      {optionCategorySelect && (
        <>
          {sizes.length != 0 && (
            <>
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
            </>
          )}
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
                      value: 0,
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
                      value: 0,
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
          {(sizes.length !== 0) && (
            <>
              <InputSelect
                label="Genero"
                nameInput="gender"
                isDisabled={isDisabled}
                register ={{...register("targetGender", {
                  required: "El genero es obligatorio",
                })}}
                errorValue={errors.gender?.message}
                options={genders}
              
              />
              
            </>
          )}
        </>
      )}
      <span className="text-sm text-[#f00] normal-case font-light min-h-6 max-h-6">
        { erroImgExist && (erroImgExist)}
      </span>
      <button disabled={!isActiveButton} className={`${isActiveButton?"bg-[#2B1B42]":"bg-[#0b0613bb]"} rounded-xl text-white font-extrabold text-2xl w-full text-[#fff] h-10`} type="submit" >
        Agregar producto
      </button>
    </form>
    
    </>
  );
}
