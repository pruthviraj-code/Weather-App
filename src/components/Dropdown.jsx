import React, { useEffect, useRef, useState } from "react";
import dropdown from "@/assets/images/icon-dropdown.svg";

export default function Dropdown(props) {
  const { variant = "Neutral800", icon, label, children } = props;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const variants = {
    Neutral800: "bg-Neutral-800",
    Neutral600: "bg-Neutral-600",
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`right-0 flex items-center justify-center gap-2 rounded-md px-2.5 py-2 whitespace-nowrap transition-colors hover:opacity-90 ${variants[variant]}`}
      >
        {icon && <img src={icon} className="desktop:w-4 w-3" alt="" />}
        <p className="desktop:text-[16px] text-[11px]">{label || "Units"}</p>
        <img
          src={dropdown}
          className="desktop:w-3.5 w-2.5"
          alt="dropdown_icon"
        />
      </button>
      {isOpen && (
        <div
          className={`bg-Neutral-800 absolute top-full right-0 z-50 mt-2 rounded-md p-2 shadow-lg`}
        >
          {children}
        </div>
      )}
    </div>
  );
}