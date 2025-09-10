import React, { useId } from "react";

const Input = React.forwardRef(
  ({ label, type = "text", classname = "", ...props }, ref) => {
    const id = useId();

    return (
      <div className="w-full">
        {label && (
          <label className="inline-block mb-1 pl-1 font-semibold text-gray-700" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          type={type}
          className={`px-3 py-2 rounded-xl bg-white/90 dark:bg-gray-900 text-black dark:text-white outline-none border border-blue-200 dark:border-gray-700 w-full shadow-sm focus:shadow-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 ${classname}`}
          ref={ref}
          {...props}
          id={id}
        />
      </div>
    );
  }
);

export default Input;
