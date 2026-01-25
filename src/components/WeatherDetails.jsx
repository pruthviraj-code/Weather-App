import React from "react";

export default function WeatherDetails({
  temperature,
  temperatureUnit,
  relativeHumidity,
  relativeHumidityUnit,
  precipitation,
  precipitationUnit,
  windSpeed,
  windSpeedUnit,
}) {
  const weatherData = [
    {
      label: "Feels like",
      value: temperature,
      unit: temperatureUnit,
    },
    {
      label: "Humidity",
      value: relativeHumidity,
      unit: relativeHumidityUnit,
    },
    {
      label: "Wind",
      value: windSpeed,
      unit: windSpeedUnit,
    },
    {
      label: "Precipitation",
      value: precipitation ?? 0,
      unit: precipitationUnit,
    },
  ];
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
         {  ` ${item.value} 
             ${item.unit}`}
          </p>
        </div>
      ))}
    </>
  );
}
