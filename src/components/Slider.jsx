import React from 'react'

export default function Slider({children}) {
  return (
    <div className="overflow-x-auto scrollbar-hidden h-64 pr-2 pt-5 w-[93%] mt-5 inline-flex gap-10">
      {children}
    </div>
  );
}
