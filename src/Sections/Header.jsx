import React, { useEffect } from "react";
import logo from "@/assets/images/logo.svg";
import Dropdown from "@/components/Dropdown";
import units from "@/assets/images/icon-units.svg";

export default function Header() {



  return (
    <header className="mx-4 mt-8 flex items-center justify-between sm:mx-8 md:mx-12 lg:mx-16 xl:mx-18">
      <img src={logo} className="w-32 sm:w-36 lg:w-36 xl:w-54" alt="logo" />
      <Dropdown variant="Neutral800" icon={units} label="Units">
        <div className="text-Neutral-200 flex flex-col whitespace-nowrap">
          <p className="px-2 py-2 pr-18 text-[12px]">Switch to Imperial</p>
          <div className="border-Neutral-600 border-b py-2 text-[12px]">
            <p className="text-Neutral-300 px-2 pr-18 pb-1 text-[11px]">
              Temperature
            </p>
            <p className="hover:bg-Neutral-700 rounded px-2 py-1.5 pr-18">
              {" "}
              Celsius (°C)
            </p>
            <p className="hover:bg-Neutral-700 mt-1 cursor-pointer rounded px-2 py-1.5 pr-18">
              Fahrenheit (°F)
            </p>
          </div>
          <div className="border-Neutral-600 border-b py-2 text-[12px]">
            <p className="text-Neutral-300 px-2 pr-18 pb-1 text-[11px]">
              Wind Speed
            </p>
            <p className="hover:bg-Neutral-700 rounded px-2 py-1.5 pr-18">
              {" "}
              km/h
            </p>
            <p className="hover:bg-Neutral-700 mt-1 cursor-pointer rounded px-2 py-1.5 pr-18">
              mph
            </p>
          </div>
          <div className="py-2 text-[12px]">
            <p className="text-Neutral-300 px-2 pr-18 pb-1 text-[11px]">
              {" "}
              Precipitation
            </p>
            <p className="hover:bg-Neutral-700 rounded px-2 py-1.5 pr-18">
              {" "}
              Millimeters (mm)
            </p>
            <p className="hover:bg-Neutral-700 mt-1 cursor-pointer rounded px-2 py-1.5 pr-18">
              {" "}
              Inches (in)
            </p>
          </div>
        </div>
      </Dropdown>
    </header>
  );
}
