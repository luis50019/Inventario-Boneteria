import React from "react";
import { IoIosAdd } from "react-icons/io";
import { typesClothing } from "../../utils/dataFail";
import { useNavigate} from "react-router";
import { CardClothing } from "../Cards/CardClothing";

export default function ProductManagement({ products }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/Inventary/NewProduct");
  };
  return (
    <>
      <div className="h-96 min-w-full max-w-full pr-5 mt-8 flex flex-col gap-5">
        <h2 className="text-3xl text-[#2B1B42] font-extrabold">Productos</h2>
        <div className="flex justify-between min-w-full max-w-full ">
          <select className="bg-[#fff] text-xl border-b-[.5px] capitalize font-light text-[#2B1B42]" name="clothings" id="typesClothing">
						<option value={"Todo"}>Todo</option>
            {typesClothing?.map((clothing, index) => (
              <option value={clothing.name} key={index}>
                {clothing.name}
              </option>
            ))}
          </select>
          <button onClick={handleNavigate} className="bg-[#fff]">
            <IoIosAdd className="font-extrabold text-4xl" />
          </button>
        </div>

        <div className="flex flex-col items-center">
          {products?.map((product) => (
            <CardClothing
              availableUnits={product.availableUnits}
              id={product._id}
              incomeGenerated={product.incomeGenerated}
              productName={product.productName}
              profitsTotal={product.profitsGenerated}
              size={product.garment.size.size}
              soldUnits={product.soldUnits}
              images={product.images}
              key={product._id}
            />
          ))}
        </div>
      </div>
    </>
  );
}
