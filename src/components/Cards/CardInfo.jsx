import React from "react";

export default function CardInfo({title,value=0}) {
  return (
    <div className="flex justify-between w-full pl-2 pr-3 mt-5">
      <span className="font-extralight">{title}</span>
      <span className="font-extralight">{value}</span>
    </div>
  );
}
