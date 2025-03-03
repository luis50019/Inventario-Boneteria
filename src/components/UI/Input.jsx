import React, { forwardRef } from "react";
import "../../styles/Input.css";
const Input = forwardRef(
  (
    { label, nameInput,inputDisabled, placeholder, type,defualtvalue="",register,errorValue },ref
  ) => {
    return (
      <div className="flex flex-col gap-2 mt-3 min-w-full max-w-full">
        <label htmlFor={nameInput} className="text-xl text-[#2B1B42] font-extrabold">{label}</label>
        <input
          type={type}
          name={nameInput}
          step={"0.01"}
					{...register}
          className={`${inputDisabled ? "inputDisable" : "inputActive"} pl-2 w-full capitalize`}
          placeholder={placeholder}
					disabled={inputDisabled}
        />
        <span className="text-sm text-[#f00] normal-case font-light min-h-6 max-h-6">
          {errorValue && (errorValue)}
        </span>
      </div>
    );
  }
);

export default Input;
