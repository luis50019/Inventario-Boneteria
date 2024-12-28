import React from "react";

export default function Slider({ children, height, title }) {
  return (
    <div className={`w-full h-${height} px-4`}>
      {title && (
        <h2 className="text-xl md:text-2xl font-bold text-[#2B1B42] mb-4">
          {title}
        </h2>
      )}
      {children ? (
        <div
          className={`overflow-x-auto rounded-lg h-${height || "slider-normal"} 
          pr-4 pt-4 pb-4 w-full flex gap-6 items-center scrollbar-hidden scroll-smooth`}
        >
          {children}
        </div>
      ) : (
        <p className="text-[#000] text-center py-4">No hay productos</p>
      )}
    </div>
  );
}
