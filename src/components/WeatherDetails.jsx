import React from "react";

const weatherData = [
  { label: "Feels like", value: "20°" },
  { label: "Humidity", value: "46%" },
  { label: "Wind", value: "14 km/h" },
  { label: "Precipitation", value: "0 mm" },
];

export default function WeatherDetails() {
  return (
    <>
      {weatherData.map((item, index) => (
        <div
          key={index}
          className="bg-Neutral-800 border-Neutral-300/8 flex flex-col justify-between rounded-lg border p-2.5 sm:p-3"
        >
          <p className="text-Neutral-300 text-xs sm:text-[13px]">
            {item.label}
          </p>
          <p className="mobile:pt-0 pt-4 text-lg font-medium sm:text-xl md:text-[20px]">
            {item.value}
          </p>
        </div>
      ))}
    </>
  );
}
