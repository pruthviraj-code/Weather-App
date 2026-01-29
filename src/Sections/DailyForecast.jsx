import React from "react";
import WeatherIcon from "@/components/WeatherIcon";
import { getWeatherCondition } from "@/helpers/getWeatherCondition";
import { getDailyFromHourly } from "@/helpers/getDailyFromHourly";
import { useUnits } from "@/context/UnitsContext";

export default function DailyForecast({ hourlyData }) {
  const { convertTemperature } = useUnits();
  const dailyData = getDailyFromHourly(hourlyData);

  return (
    <div className="mobile:mt-0 mt-4">
      <h3 className="mb-3 text-sm font-medium sm:mb-4 sm:text-base">
        Daily Forecast
      </h3>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
        {dailyData.map((item) => {
          const condition = getWeatherCondition({
            temperature: item.temperature_max,
            precipitation: item.precipitation_sum,
            windSpeed: item.wind_max,
          });

          const weekday = new Date(item.date).toLocaleDateString("en-US", {
            weekday: "short",
          });

          const tempMax = convertTemperature(item.temperature_max);
          const tempMin = convertTemperature(item.temperature_min);

          return (
            <div
              key={item.date}
              className="bg-Neutral-800 border-Neutral-300/8 flex w-full flex-col items-center gap-1.5 rounded-lg border p-2 sm:gap-2"
            >
              <p className="text-xs sm:text-[12px]">{weekday}</p>

              <WeatherIcon
                condition={condition}
                alt={condition}
                className="w-16 sm:w-18"
              />

              <div className="flex w-full justify-between">
                <p className="text-[12px] font-light">{tempMax}°</p>
                <p className="text-Neutral-400 text-[12px] font-light">
                  {tempMin}°
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}