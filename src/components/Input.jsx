import React, { useId, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const inputType = passwordVisible ? "text" : type;

  const id = useId();
  return (
    <div className="w-full flex flex-col gap-1 relative">
      {label && (
        <label
          className="pl-1 text-lg text-gray-950 font-[500] font-inter"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={inputType}
        className={`px-3 py-2.5 rounded-sm border-gray-300 bg-white backdrop-blur-md text-gray-700 font-nunito-sans text-base font-[500] outline-none focus:bg-gray-50 focus:border-blue-500 duration-200 border w-full ${className}`}
        ref={ref}
        {...props}
        id={id} 
        
      />
      {type == "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className={`absolute right-4 top-[60%] text-lg ${!passwordVisible ? "text-gray-800" : "text-[#eb2828]"}`}
        >
          {passwordVisible ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
  );
});

export default Input;
