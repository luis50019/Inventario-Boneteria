import React from "react";

export default function ImgInput({changeImg}) {
	const handleImg = async (e)=>{
		const file = e.target.files[0];
		if(file){
			changeImg(file);
		}

	}
  return (
    <>
      <div className="w-full rounded-lg h-[40rem] bg-[#f7f6f6] flex flex-col gap-5 justify-center items-center">
        <input type="file" className="text-[#070707] "  onChange={handleImg} accept="image/" />
      </div>
    </>
  );
}
