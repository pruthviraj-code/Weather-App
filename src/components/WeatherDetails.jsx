import React from "react";
import { useUnits } from "@/context/UnitsContext";

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
  const {
    convertTemperature,
    convertWindSpeed,
    convertPrecipitation,
    temperatureUnit: userTempUnit,
    windSpeedUnit: userWindUnit,
    precipitationUnit: userPrecipUnit,
  } = useUnits();

  const weatherData = [
    {
      label: "Feels like",
      value: convertTemperature(temperature),
      unit: userTempUnit === "celsius" ? "°C" : "°F",
    },
    {
      label: "Humidity",
      value: relativeHumidity,
      unit: relativeHumidityUnit,
    },
    {
      label: "Wind",
      value: convertWindSpeed(windSpeed),
      unit: userWindUnit,
    },
    {
      label: "Precipitation",
      value: convertPrecipitation(precipitation ?? 0),
      unit: userPrecipUnit,
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
            {`${item.value} ${item.unit}`}
          </p>
        </div>
      ))}
    </>
  );
}