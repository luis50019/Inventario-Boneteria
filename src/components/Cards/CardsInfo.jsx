import { useEffect, useState } from 'react';
import '../../styles/CardInfo.css'

export function CardsInfo({ valor, titleCard}) {
  const [color, setColor] = useState(()=>{
    const title = titleCard.toLowerCase();
    return title.includes('ventas');
  });

  return (
    <div
      className={`
        rounded-xl min-h-56 max-h-56 min-w-44 max-w-44 text-center ${color ? "bg-title" : "bg-[#fff]"}
        flex flex-col cont-card px-1 pt-3 mb-3
        `}
    >
      <p
        className={`${
          color ? "text-[#fff]" : "text-title"
        } h-14  text-center w-full min-h-20 text-xl font-semibold`}
      >
        {titleCard}
      </p>
      <div
        className={`${color ? "text-[#fff]" : "text-title"} h-64 mt-5 price text-wrap`}
      >
        ${valor}
      </div>
    </div>
  );
}