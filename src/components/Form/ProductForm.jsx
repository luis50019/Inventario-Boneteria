import React, { useEffect, useRef, useState } from "react";
import { useForm,Controller } from "react-hook-form";
import { typesClothing } from "../../utils/dataFail";
import CardInfo from "../Cards/CardInfo";
import "../../styles/Input.css";
import Input from "../UI/Input";
import { modesForm } from "./utilsForm";
import { UseContextApp } from "../../context/AppContext";
import Webcam from "react-webcam";
const URL_IMG =
  "https://w7.pngwing.com/pngs/853/276/png-transparent-gray-crew-neck-shirt-t-shirt-polo-shirt-clothing-grey-t-shirt-tshirt-fashion-active-shirt-thumbnail.png";

const videoConstraints = {
	width:1280,
	height:720
}
export default function ProductForm({ product, option = "view" }) {
	const {addProductToInventary} = UseContextApp();
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		control,
		formState: { error },
	} = useForm({ defaultValues: { ...product } });
	const webCamRef = useRef(null)
	const [isDisabled, setIsDisabled] = useState(true);
	const [modeForm,setModeForm] = useState(option)
	const [functionForm,setFunctionForm] = useState();
	const [facingMode,setFacingMode] = useState('environment');
	const onSubmit = (data) => console.log(data);

	// codigo para tomar la foto
	const capturee =()=>{
		const imgSrc = webCamRef.current.getScreenshot();
		console.log(imgSrc);
	}

	// codigo para vereficar el tipo de operacion que se ralizara
	useEffect(() => {
		if (modeForm === "view") {
			setIsDisabled(true);
			for (const key in product) {
				if (
					key !== "images" ||
					key !== "typeProduct" ||
					key !== "garment" ||
					key !== "category" ||
					key !== "size"
				) {
					setValue(key, product[key]);
				}
				if (key === "garment") {
					setValue("typeClothing", product[key].typeClothing.typeclothing);
					setValue("size", product[key].size.size);
				}

				if (key === "category") {
					setValue(key, product[key].category);
				}
			}
		}
		if(modeForm == "edit"){
			setIsDisabled(false)
		}
		if(modeForm == "new"){
			setIsDisabled(false);
			setFunctionForm((newProduct)=> addProductToInventary(newProduct))
			reset()
		}
	}, [product || modeForm]);

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="mt-5 pl-2 pb-5 flex flex-col gap-5 min-h-[130vh] max-h[105vh] items-start capitalize"
		>
			
			<Webcam
				ref={webCamRef}
				height={360}
				screenshotFormat="image/png"
				audio={false}
				width={720}
				videoConstraints={
					{
						width:1280,
						height:720,
						facingMode:'user',
					}
				}

			/>

			<Input
				label="Nombre del producto"
				nameInput="nameProduct"
				type="text"
				register={{ ...register("productName") }}
				InputRequiered={true}
				inputDisabled={isDisabled}
			/>
			<div className="flex flex-col gap-1 min-w-full max-w-full">
				<label
					htmlFor="category"
					className="text-[#2B1B42] font-extrabold text-2xl capitalize"
				>
					categoria
				</label>
				<select
					name="category"
					disabled={isDisabled}
					{...register("category", { required: true })}
					className="w-full font-medium text-[#1E1E1E] h-9 capitalize rounded-lg"
				>
					{typesClothing.map((category, index) => (
						<option key={index} value={category.name}>
							{category.name}
						</option>
					))}
				</select>
			</div>
			<Input
				label="Tipo de prenda"
				nameInput="clothingType"
				type="text"
				register={{ ...register("clothingType") }}
				InputRequiered={true}
				inputDisabled={isDisabled}
			/>
			<div className="flex flex-col gap-1 min-w-[25%] max-w-[25%]">
					<label htmlFor="size">Talla</label>
					<select name="size" disabled={isDisabled} {...register("size", { required: true })} className="w-full rounded-lg font-medium text-[#1E1E1E] h-9 capitalize">
					{typesClothing.map((category, index) => (
						<option key={index} value={category.name}>
							{category.name}
						</option>
					))}
					</select>

			</div>
			<div className="flex flex-col gap-[5px] min-w-full max-w-full">
				<label className="text-2xl text-[#2B1B42] font-extrabold">
					Precio De:
				</label>
				<div className="grid grid-cols-2 gap-3">
					<Input
						label="Compra"
						nameInput="purchase"
						type="number"
						register={{ ...register("purchasePrice") }}
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
						register={{ ...register("unitPrice") }}
						InputRequiered={true}
						inputDisabled={isDisabled}
					/>
					<Input
						label="Docena"
						nameInput="dozen"
						type="number"
						register={{ ...register("dozenPrice") }}
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
					register={{ ...register("availableUnits") }}
					InputRequiered={true}
					inputDisabled={isDisabled}
				/>
			</div>
			<div className="w-[50%]">
				<Input
					label="Descuento"
					nameInput="discount"
					type="number"
					register={{ ...register("discount") }}
					InputRequiered={true}
					inputDisabled={isDisabled}
				/>
			</div>
			{
				modeForm === 'new'&&(
					< >
						<Controller
							name="isSecondHand"
							control={control}
							render={({ field }) => (
								<div className="flex gap-10 min-w-full max-w-full">
									<h4 className="text-xl font-bold text-[#1E1E1E]">Segunda mano</h4>
									<label htmlFor="radioYes" className="flex items-center gap-1">Si<input name="radioYes" type="radio" {...field} value="yes"/></label>
									<label htmlFor="radioNo" className="flex items-center gap-1">No<input name="radioNo" type="radio" {...field} value="no"/></label>
								</div>
							)}
						/>
						<div>
							<label htmlFor="Gender" className="font-bold text-xl text-[#1E1E1E]">Genero</label>
							<select name="Gender" disabled={isDisabled} {...register("targetGender")} className="w-full rounded-lg font-medium text-[#1E1E1E] h-9 capitalize">
								<option value="femenino">Femenino</option>
								<option value="masculino">masculino</option>
							</select>
						</div>
						<h3 className="text-xl font-bold text-[#1E1E1E]">Rango de edad</h3>
						<div className="grid grid-cols-2 gap-10 min-w-full max-w-full">
							<Input label="Edad minima" nameInput="minAge" type="number" register={{...register('minimumAge')}} InputRequiered={true} inputDisabled={isDisabled}/>
							<Input label="Edad maxima" nameInput="maxAge" type="number" register={{...register('maximumAge')}} InputRequiered={true} inputDisabled={isDisabled}/>
						</div>
						<div className="min-w-[50%] max-w-[50%]">
						<Input label="Edad destinada" nameInput="age" type="text" register={{...register('targetAge')}} InputRequiered={true} inputDisabled={isDisabled}/>
						</div>
					
					</>
				)
			}

			<div className="w-full min-h-34 max-h-34 ">
				{product && (
					<>
						<h2 className="text-[#2B1B42] font-extrabold text-2xl pl-2">
							INFORME DE VENTAS
						</h2>
						<CardInfo
							title={"Unidades vendidas"}
							value={product?.soldUnits || 0}
						/>
						<CardInfo
							title={"Ingreso total"}
							value={product?.incomeGenerated || 0}
						/>
						<CardInfo
							title={"Ganancias"}
							value={product?.profitsGenerated || 0}
						/>
					
					</>
					)}
			</div>
			<button
				type="submit"
				className="bg-[#2B1B42] rounded-xl text-white font-extrabold text-2xl w-full text-[#fff] h-10"
			>
				{modesForm[modeForm]?.titleButton}	
			</button>
		</form>
	);
}
