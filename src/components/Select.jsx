import { useId } from "react";
import { forwardRef } from "react";

function Select({ options, label, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor="id"
          className="pl-1 text-lg text-gray-950 font-[500] font-inter"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        {...props}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-base outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(Select);
