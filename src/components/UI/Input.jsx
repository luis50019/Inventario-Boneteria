import React, { forwardRef } from "react";
import "../../styles/Input.css";
const Input = forwardRef(
  (
    { label, nameInput,inputDisabled, placeholder, type,defualtvalue="" },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-2 min-w-full max-w-full">
        <label htmlFor={nameInput} className="text-xl text-[#2B1B42] font-extrabold">{label}</label>
        <input
          type={type}
          name={nameInput}
					ref={ref}
          className={`${inputDisabled ? "inputDisable" : "inputActive"} pl-2 w-full`}
          placeholder={placeholder}
					disabled={inputDisabled}
					defualtValue={defualtvalue}
        />
      </div>
    );
  }
);

export default Input;
