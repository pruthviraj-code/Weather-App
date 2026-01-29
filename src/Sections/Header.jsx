import React from "react";
import logo from "@/assets/images/logo.svg";
import Dropdown from "@/components/Dropdown";
import units from "@/assets/images/icon-units.svg";
import checkmark from "@/assets/images/icon-checkmark.svg";
import { useUnits } from "@/context/UnitsContext";

export default function Header() {
  const {
    temperatureUnit,
    setTemperatureUnit,
    windSpeedUnit,
    setWindSpeedUnit,
    precipitationUnit,
    setPrecipitationUnit,
  } = useUnits();

  const isMetric = temperatureUnit === "celsius" && windSpeedUnit === "kmh" && precipitationUnit === "mm";

  const handleSwitchToImperial = () => {
    setTemperatureUnit("fahrenheit");
    setWindSpeedUnit("mph");
    setPrecipitationUnit("in");
  };

  const handleSwitchToMetric = () => {
    setTemperatureUnit("celsius");
    setWindSpeedUnit("kmh");
    setPrecipitationUnit("mm");
  };

  return (
    <header className="mx-4 mt-8 flex items-center justify-between sm:mx-8 md:mx-12 lg:mx-16 xl:mx-18">
      <img src={logo} className="w-32 sm:w-36 lg:w-36 xl:w-54" alt="logo" />
      <Dropdown variant="Neutral800" icon={units} label="Units">
        <div className="text-Neutral-200 flex flex-col whitespace-nowrap">
          <p 
            onClick={isMetric ? handleSwitchToImperial : handleSwitchToMetric}
            className="px-2 py-2 w-[192px] text-[12px] hover:bg-Neutral-700 rounded cursor-pointer"
          >
            {isMetric ? "Switch to Imperial" : "Switch to Metric"}
          </p>
          <div className="border-Neutral-600 border-b py-2 text-[12px]">
            <p className="text-Neutral-300 px-2 pb-1 text-[11px]">
              Temperature
            </p>
            <p 
              onClick={() => setTemperatureUnit("celsius")}
              className="hover:bg-Neutral-700 w-full rounded px-2 py-1.5 flex items-center justify-between cursor-pointer"
            >
              Celsius (°C)
              {temperatureUnit === "celsius" && (
                <img src={checkmark} alt="" className="h-4 w-4" />
              )}
            </p>
            <p 
              onClick={() => setTemperatureUnit("fahrenheit")}
              className="hover:bg-Neutral-700 w-full mt-1 cursor-pointer rounded px-2 py-1.5 flex items-center justify-between"
            >
              Fahrenheit (°F)
              {temperatureUnit === "fahrenheit" && (
                <img src={checkmark} alt="" className="h-4 w-4" />
              )}
            </p>
          </div>
          <div className="border-Neutral-600 border-b py-2 text-[12px]">
            <p className="text-Neutral-300 px-2 pb-1 text-[11px]">
              Wind Speed
            </p>
            <p 
              onClick={() => setWindSpeedUnit("kmh")}
              className="hover:bg-Neutral-700 w-full rounded px-2 py-1.5 flex items-center justify-between cursor-pointer"
            >
              km/h
              {windSpeedUnit === "kmh" && (
                <img src={checkmark} alt="" className="h-4 w-4" />
              )}
            </p>
            <p 
              onClick={() => setWindSpeedUnit("mph")}
              className="hover:bg-Neutral-700 w-full mt-1 cursor-pointer rounded px-2 py-1.5 flex items-center justify-between"
            >
              mph
              {windSpeedUnit === "mph" && (
                <img src={checkmark} alt="" className="h-4 w-4" />
              )}
            </p>
          </div>
          <div className="py-2 text-[12px]">
            <p className="text-Neutral-300 px-2 pb-1 text-[11px]">
              Precipitation
            </p>
            <p 
              onClick={() => setPrecipitationUnit("mm")}
              className="hover:bg-Neutral-700 w-full rounded px-2 py-1.5 flex items-center justify-between cursor-pointer"
            >
              Millimeters (mm)
              {precipitationUnit === "mm" && (
                <img src={checkmark} alt="" className="h-4 w-4" />
              )}
            </p>
            <p 
              onClick={() => setPrecipitationUnit("in")}
              className="hover:bg-Neutral-700 w-full mt-1 cursor-pointer rounded px-2 py-1.5 flex items-center justify-between"
            >
              Inches (in)
              {precipitationUnit === "in" && (
                <img src={checkmark} alt="" className="h-4 w-4" />
              )}
            </p>
          </div>
        </div>
      </Dropdown>
    </header>
  );
}