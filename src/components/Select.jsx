import { useId } from "react";
import { forwardRef } from "react";

function Select({ options, label, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <label
          htmlFor="id"
          className="pl-1 text-lg text-gray-950 dark:text-white font-[500] font-inter"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        {...props}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white dark:bg-[#18181b] dark:border-[#2b2b2e] text-base text-gray-700 dark:text-slate-300 outline-none focus:bg-gray-50 duration-200 border-[1px] border-gray-200 w-full ${className}`}
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
