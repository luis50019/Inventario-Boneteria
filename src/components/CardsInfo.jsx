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
        rounded-xl h-52 min-w-40 max-w-40 text-center ${color ? "bg-title" : "bg-[#fff]"}
        flex flex-col gap-2 p-2 cont-card pt-3
        `}
    >
      <p
        className={`${
          color ? "text-[#fff]" : "text-title"
        } h-14  text-center w-full text-xl font-semibold`}
      >
        {titleCard}
      </p>
      <span
        className={`${color ? "text-[#fff]" : "text-title"} mt-5 price text-wrap`}
      >
        $ {valor}
      </span>
    </div>
  );
}