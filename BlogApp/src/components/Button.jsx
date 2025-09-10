import React from "react";

const Button = ({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) => {
  return (
    <button
  className={`px-4 py-2 rounded-xl font-semibold shadow-md ${className} ${bgColor} ${textColor} bg-gradient-to-r from-blue-600 to-purple-500 hover:from-purple-500 hover:to-blue-600 hover:text-white border border-blue-200 dark:border-gray-700 transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:outline-none`}
      {...props}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
