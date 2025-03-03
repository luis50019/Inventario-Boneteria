import React, { useEffect, useState } from "react";
import ImgInput from "./ImgInput";
import Camara from "./Camara";
export default function ContImg({ setCaptureImg,img,isDisabled =false }) {
  const [imgExist, setImgExist] = useState(()=>img.opcion=== ""?false:true);
  const [opcion, setOpcion] = useState(()=>img.opcion=== ""?"sinImg":img.opcion);
  const deleteImgSelect = () => {
    setCaptureImg(null);
		setImgExist(false);
    setOpcion("sinImg");
  };  
	const captureImg =(imgSrc)=>{
    if(!imgSrc){
      setOpcion("sinImg");
      setImgExist(false);
      return;
    }
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
		setImgExist(true)
	}

  useEffect(()=>{
    setImgExist(()=>img.opcion=== ""|| img.opcion==undefined?false:true)
  },[img])

  return (
    <>
      
      {imgExist && (
        <div className="w-full rounded-lg h-[50rem] bg-[#f7f6f6] flex flex-col gap-5 justify-center items-center">
          <img className="w-[90%] h-auto" src={img.imgLocal} />
          {
            !isDisabled && (<button
              onClick={deleteImgSelect}
              className="h-10 pr-5 pl-5 rounded-md bg-[#ff0f0f] text-[#fff] font-bold">
              Borrar foto
            </button>)
          }
        </div>
      )
      
      }
      {(opcion == "sinImg" )&&(
        <div className="flex justify-between items-center bg-[#f7f6f6] rounded-xl w-full gap-5 p-2 h-[40rem]">
          <button
            onClick={() => setOpcion("camara")}
            className="bg-[#1E1E1E] text-xl p-3 w-[50%] h-16 text-[#fff] rounded-lg"
          >
            Tomar foto
          </button>
          <button
            onClick={() => setOpcion("img")}
            className="bg-[#070707] text-xl w-[50%] h-16 text-[#fff] rounded-lg"
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
