import React, { forwardRef } from "react";

const InputSelect = forwardRef(({message="Selecciona", label, nameInput,isDisabled, register,options =[],errorValue }, ref) => {
  return (
    <div className="flex flex-col gap-1 min-w-full max-w-full">
      <label
        htmlFor={nameInput}
        className="text-[#2B1B42] font-extrabold text-2xl capitalize"
      >
        {label}
      </label>
      <select
        name={nameInput}
        disabled={isDisabled}
        {...register}
        className={`${isDisabled ? "inputDisable" : "inputActive"} w-full font-medium text-[#1E1E1E] h-9  rounded-lg`}
      >
        <option value="" className="normal-case">{message}</option>
        {options&&(options.map((option, index) => (
          <option key={index} value={option._id} className="capitalize">
            {option[nameInput]}
          </option>
        )))}
      </select>
      <span className="text-sm text-[#f00] normal-case font-light min-h-6 max-h-6">
          {errorValue && (errorValue)}
      </span>
    </div>
  );
});

export default InputSelect;
