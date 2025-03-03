import React from "react";

export default function ImgInput({changeImg}) {
	const handleImg = async (e)=>{
		const file = e.target.files[0];
		if(file){
			changeImg(file);
		}
	}

  const handlerCancel =()=>{
    changeImg(undefined)
  }

  return (
    <>
      <div className="w-full border-2 rounded-lg h-[40rem] bg-[#f7f6f6] flex flex-col gap-5 justify-center items-center">
        <input type="file" className="text-[#070707] min-w-[80%] max-w-[80%]"  onChange={handleImg} accept="image/" />
        <button onClick={handlerCancel} className="bg-[#f00] min-w-[90%] max-w-[90%] rounded-lg font-bold text-xl text-[#fff]">Cancelar</button>
      </div>
    </>
  );
}
