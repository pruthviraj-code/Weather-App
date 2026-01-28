import React from "react";

export default function Button({ children, variant, onClick, className = "" }) {
  const variants = {
    full: "w-full mobile:w-auto py-3 mobile:py-2 text-[18px] mobile:text-sm",
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={`${className || "bg-Blue-500 hover:bg-Blue-700"} text-sm sm:text-base ${variants[variant]} rounded-lg px-3 py-2 whitespace-nowrap transition-colors sm:px-4 focus:outline-2 focus:outline-blue-700 focus:outline-offset-2`}
    >
      {children || "Search"}
    </button>
  );
}