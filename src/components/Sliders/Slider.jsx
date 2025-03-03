import React from "react";

export default function Slider({ children, height, title }) {
  return (
    <div className={`w-full h-${height} px-4`}>
      {title && (
        <h2 className="text-2xl md:text-2xl font-bold text-[#F65D46] mb-4">
          {title}
        </h2>
      )}
      {children ? (
        <div
          className={`overflow-x-auto rounded-lg h-${height || "slider-normal"} 
          pr-4 pb-4 w-full flex gap-6 items-center scrollbar-hidden scroll-smooth`}
        >
          {children}
        </div>
      ) : (
        <p className="text-[#000] text-center py-4">No hay productos</p>
      )}
    </div>
  );
}
