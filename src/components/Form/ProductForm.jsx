import React,{useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import {typesClothing} from "../../utils/dataFail";
import '../../styles/Input.css'
import Input from "../UI/Input";

export default function ProductForm({product}) {
	const{register,handleSubmit,formState:{error}} = useForm(
		{defaultValues: {...product}}
	);
	const [isDisabled, setIsDisabled] = useState(true);
	const onSubmit = (data) => console.log(data);
	
	useEffect(()=>{
		if(product){
			setIsDisabled(false);
		}

	},[])

  return (
		<form onSubmit={handleSubmit(onSubmit)} 
		className="mt-5 pl-2 pb-5 flex flex-col gap-5 h-[75vh] items-start">
			<div className="flex flex-col gap-1 min-w-full max-w-full">
				<label htmlFor="category" className="text-[#2B1B42] font-extrabold text-2xl" >Category</label>
				<select name='category' {...register('category',{required:true})} className="w-full font-medium text-[#1E1E1E] h-9">
					{typesClothing.map((category,index)=>(
						<option key={index} value={category.name}>{category.name}</option>
					))}
				</select>
			</div>
			<Input label="Tipo de prenda" nameInput="typeClothing" type="text" {...register("typeClothing")} InputRequiered={true} inputDisabled={isDisabled} />
			<div className="flex flex-col gap-[5px] min-w-full max-w-full">
				<label className="text-2xl text-[#2B1B42] font-extrabold">Precio De:</label>
				<div className="grid grid-cols-2 gap-3">
					<Input label="Compra" nameInput="purchase" type="number" {...register("purchase")} InputRequiered={true} inputDisabled={isDisabled} />
				</div>
			</div>
			<div className="flex flex-col gap-[5px] min-w-full max-w-full">
				<label className="text-2xl text-[#2B1B42] font-extrabold">Precio Por:</label>
				<div className="grid grid-cols-2 gap-3">
					<Input label="Unidad" nameInput="unit" type="number" {...register("unit")} InputRequiered={true} inputDisabled={isDisabled} />
					<Input label="Docena" nameInput="dozen" type="number" {...register("dozen")} InputRequiered={true} inputDisabled={isDisabled} />
				</div>
			</div>
			<div className="w-[50%]">
				<Input label="Unidades adquiridas" nameInput="availableUnits" type="number" ref={register("availableUnits",{required:"Campo obligatorio"})} InputRequiered={true} inputDisabled={isDisabled} />
			</div>
			<div className="w-[50%]">
				<Input label="Descuento" nameInput="discount" type="number" {...register("discount")} InputRequiered={true} inputDisabled={isDisabled} />
			</div>
					
			<button type="submit" className="bg-[#2B1B42] rounded-xl text-white font-extrabold text-2xl w-full text-[#fff] h-10">Añadir al inventario</button>
		
		</form>
	);
}
