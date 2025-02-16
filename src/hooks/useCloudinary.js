import { useState } from "react";

const useCloudinary = () => {
  const updateImage = async(formData) => {
    try {
			const url = await fetch("https://api.cloudinary.com/v1_1/dzqytawx9/image/upload",{
				method:"POST",
				body:formData,
			})
			const urlJson = await url.json();
			return urlJson

    } catch (e) {
      console.log(e);
    }
  };
	return { updateImage };
};

export default useCloudinary;