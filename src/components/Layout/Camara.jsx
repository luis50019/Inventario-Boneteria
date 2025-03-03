import React, { useRef } from "react";
import Webcam from "react-webcam";

export default function ImageProduct({ setImg }) {
  const webCamRef = useRef(null);
  const capture = async () => {
    const imgSrc = webCamRef.current.getScreenshot();
    setImg(imgSrc);
  };
  const handlerCancel =()=>{
    setImg(undefined)
  }
  return (
    <>
      <div className="w-[100%] h-[100%] flex flex-col gap-3 justify-center items-center">
        <Webcam
          style={{ width: "85%", height: "85%" }}
          ref={webCamRef}
          height={360}
          screenshotFormat="image/png"
          audio={false}
          width={720}
          videoConstraints={{
            width: 1280,
            height: 720,
            facingMode: "environment",
          }}
        />
        <button
          onClick={capture}
          className="h-10 pr-5 pl-5 rounded-md bg-[#2B1B42] text-[#fff] font-bold"
        >
          Tomar foto
        </button>
        <button onClick={handlerCancel} className="bg-[#f00] min-w-[90%] max-w-[90%] rounded-lg font-bold text-xl text-[#fff]">Cancelar</button>
      </div>
    </>
  );
}
