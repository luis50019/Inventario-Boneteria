const URL_IMG =
  "https://w7.pngwing.com/pngs/853/276/png-transparent-gray-crew-neck-shirt-t-shirt-polo-shirt-clothing-grey-t-shirt-tshirt-fashion-active-shirt-thumbnail.png";

import { useNavigate } from "react-router";
export const CardClothing = ({
  productName,
  soldUnits,
  incomeGenerated,
  profitsTotal,
  availableUnits,
  images = [URL_IMG],
  size,
  id,
  numberPosition,
  soldOut = false,
}) => {
  const navigate = useNavigate();

  const handleNavigate=()=>{
    navigate(`/Inventary/${id}`)
  }
  
  return (
    <>
      <div onClick={handleNavigate}
        className={`
			 d-flex flex-col min-h-10 max-h-[70rem] min-w-64 max-w-64 p-5
			 shadow-xl mb-10 mt-1 rounded-xl ${soldOut?"bg-[#FFE08A] border border-[#FFE08A]":"bg-[#fff] border border-[#ddd]"}
			`}
      >
        <img
          className="m-auto object-cover h-40"
          src={images[0]||URL_IMG}
          alt="imagen de una prenda de ropa"
          title="imagen de una prenda de ropa"
        />
        <div className="mt-4">
          {(numberPosition && !soldOut) ? (
            <span className="font-bold text-xl">#{numberPosition}</span>
          ) : (
            ""
          )}
          <h3 className="text-2xl text-[#2B1B42] font-extrabold">
            {productName}
          </h3>
          <span className="text-sm font-extralight">{size}</span>
          <div>
            <div className="flex justify-between flex-col">
              <span className={`${soldOut?"text-[#555555]":"text-[#2B1B42]"} font-extrabold`}>
                unidades vendidas
              </span>
              <span className={` text-[#F65D46]   font-extrabold`}>{soldUnits}</span>
            </div>
            <div className="flex justify-between flex-col">
              <span className={`${soldOut?"text-[#555555]":"text-[#2B1B42]"} font-extrabold`}>
                Ingresos Generados
              </span>
              <span className="text-[#F65D46] font-extrabold">
                ${" " + incomeGenerated}
              </span>
            </div>
            <div className="flex justify-between flex-col">
              <span className={`${soldOut?"text-[#555555]":"text-[#2B1B42]"} font-extrabold`}>
                Ganancias Generadas
              </span>
              <span className="text-[#F65D46] font-extrabold">
                ${" " + profitsTotal}
              </span>
            </div>
            <div className="flex justify-between flex-col">
              <span className={`${soldOut?"text-[#555555]":"text-[#2B1B42]"} font-extrabold`}>
                Unidades Disponibles
              </span>
              <span className="text-[#F65D46] font-extrabold">
                {availableUnits}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
