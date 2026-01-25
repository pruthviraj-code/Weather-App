import React, { useEffect, useMemo, useState } from "react";
import BackgroundImgLarge from "@/assets/images/bg-today-large.svg";
import BackgroundImgSmall from "@/assets/images/bg-today-small.svg";
// import sunny from "@/assets/images/icon-sunny.webp";
import WeatherIcon from "@/components/WeatherIcon";

export default function CurrentWeather({
  temperature,
  name,
  country,
  time,
  condition,
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 420);

  const formattedTime = useMemo(() => {
    if (!time) return "";
    const date = new Date(time);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  }, [time]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 420);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="relative col-span-2 sm:col-span-4">
      <img
        src={isMobile ? BackgroundImgSmall : BackgroundImgLarge}
        className="w-full"
        alt=" weather background"
      />
      <div className="mobile:flex-row absolute top-1/2 left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-between px-3 sm:px-4 md:px-6">
        <div className="flex flex-col gap-0.5 sm:gap-1">
          <h2 className="mobile:text-[22px] text-[28px] font-semibold xl:text-[34px]">
            {`${name || ""}${country ? `, ${country}` : ""}`}
          </h2>
          <p className="text-Neutral-200 mobile:text-[13px] mobile:text-start text-center text-[16px] xl:text-[20px]">
            {formattedTime}
          </p>
        </div>
        <div className="mobile:w-auto mobile:gap-1 mobile:pt-0 flex w-full items-center justify-evenly pt-2 sm:gap-2">
          <WeatherIcon
            condition={condition}
            alt={condition}
            className="mobile:w-[clamp(6rem,5.679rem+1.28vw,6.5rem)] w-28"
          />
          <p className="mobile:font-medium mobile:text-[clamp(2.5rem,1.296rem+4.82vw,4.375rem)] text-[70px] font-semibold italic">
            {Math.round(temperature)}°
          </p>
        </div>
      </div>
    </div>
  );
}
