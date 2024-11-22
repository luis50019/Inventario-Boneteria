import { useEffect, useState } from 'react';
import '../styles/CardInfo.css'

export function CardsInfo({ valor, titleCard}) {
  const [color, setColor] = useState(()=>{
    const title = titleCard.toLowerCase();
    return title.includes('ventas');
  });

  return (
    <div
      className={`
        rounded-md h-full w-42 text-center ${color ? "bg-title" : "bg-[#fff]"}
        flex flex-col gap-2 p-2 cont-card pt-3 
        `}
    >
      <p
        className={`${
          color ? "text-[#fff]" : "text-title"
        } h-14 max-w-28 text-base`}
      >
        {titleCard}
      </p>
      <span
        className={`${color ? "text-[#fff]" : "text-title"} price text-wrap`}
      >
        $ {valor}
      </span>
    </div>
  );
}