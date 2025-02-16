import React, { useEffect, useState } from "react";
import ImgInput from "./ImgInput";
import Camara from "./Camara";
export default function ContImg({ setCaptureImg,img,isDisabled =false }) {
  const [imgExist, setImgExist] = useState(()=>img.opcion==""?false:true);
  const [opcion, setOpcion] = useState('');
  const deleteImgSelect = () => {
    setCaptureImg(null);
		setImgExist(false);
    setOpcion("");
  };
  useEffect(()=>{
    console.log("imagen: ",img);
    setImgExist(img.opcion==""?false:true);
  },[img])
	const captureImg =(imgSrc)=>{
    if(opcion === 'img'){
      if(imgSrc){
        const reader = new FileReader();
        reader.onload = function(){
          setCaptureImg(imgSrc,reader.result,opcion)
        }
        reader.readAsDataURL(imgSrc)
      }
    }else{
      setCaptureImg(imgSrc,imgSrc,opcion)
    }
		setOpcion("");
		setImgExist(true)
	}

  // en imganen pasamos la url de la imagen ya existente
  // sirven cuando solo se visualza la imagen y le damos la opcion de editar
  return (
    <>
      
      {imgExist && (
        <div className="w-full rounded-lg h-[50rem] bg-[#f7f6f6] flex flex-col gap-5 justify-center items-center">
          <img className="w-[90%] h-auto" src={img.imgLocal} />
          {
            !isDisabled && (<button
              onClick={deleteImgSelect}
              className="h-10 pr-5 pl-5 rounded-md bg-[#ff0f0f] text-[#fff] font-bold"
            >
              Borrar foto
            </button>)
          }
        </div>
      )}
      {(!imgExist && !opcion)&& (
        <div className="flex justify-between items-center bg-[#f7f6f6] rounded-xl w-full gap-5 p-2 h-[40rem]">
          <button
            onClick={() => setOpcion("camara")}
            className="bg-[#1E1E1E] text-xl p-3 w-[50%] h-16 text-[#fff] rounded-lg h-10"
          >
            Tomar foto
          </button>
          <button
            onClick={() => setOpcion("img")}
            className="bg-[#070707] text-xl w-[50%] h-16 text-[#fff] rounded-lg h-10"
          >
            Cargar imagen
          </button>
        </div>
      )}

      {(opcion == "camara" && !imgExist) && <Camara setImg={captureImg} />}
      {(opcion == "img" && !imgExist) && <ImgInput changeImg={captureImg} />}
    </>
  );
}
