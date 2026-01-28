import React, { useMemo, useState } from "react";
import Dropdown from "@/components/Dropdown";
import WeatherIcon from "@/components/WeatherIcon";
import { getWeatherCondition } from "@/helpers/getWeatherCondition";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function HourlyForecast({ hourlyData }) {
  // group hourly data by day
  const groupedByDay = useMemo(() => {
    if (!hourlyData?.time) return {};

    return hourlyData.time.reduce((acc, time, i) => {
      const date = new Date(time);
      const day = date.toLocaleDateString("en-US", { weekday: "long" });

      if (!acc[day]) acc[day] = [];

      acc[day].push({
        time,
        temperature: hourlyData.temperature_2m[i],
        precipitation: hourlyData.precipitation[i],
        windSpeed: hourlyData.wind_speed_10m[i],
      });

      return acc;
    }, {});
  }, [hourlyData]);

  const [selectedDay, setSelectedDay] = useState(Object.keys(groupedByDay)[0]);
  const hourlyList = groupedByDay[selectedDay] || [];

  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  return (
    <div className="">
      {/* HEADER */}
      <div className="bg-Neutral-800 mobile:pt-3 relative z-10 flex w-full items-center justify-between rounded-t-md px-3 pt-3 sm:px-4">
        <h3 className="text-sm font-medium sm:text-base">Hourly forecast</h3>

        <Dropdown variant="Neutral600" label={selectedDay}>
          {Object.keys(groupedByDay).map((day, i) => (
            <div
              key={i}
              onClick={() => handleDaySelect(day)}
              className="hover:bg-Neutral-700 cursor-pointer text-[12px] pr-12 rounded-sm dropdown-item p-1"
            >
              {day}
            </div>
          ))}
        </Dropdown>
      </div>

      {/* LIST */}
      <div
        tabIndex={-1}
        className="bg-Neutral-800 mobile:mt-0 scrollbar-custom mobile:max-h-127.5 max-h-135 overflow-y-auto rounded-b-lg xl:max-h-142.5"
      >
        <div className="px-3 pb-3 sm:px-4 sm:pb-4">
          {hourlyList.map((item, index) => {
            const timeLabel = new Date(item.time).toLocaleTimeString("en-US", {
              hour: "numeric",
            });

            const condition = getWeatherCondition({
              temperature: item.temperature,
              precipitation: item.precipitation,
              windSpeed: item.windSpeed,
            });

            return (
              <div
                key={index}
                className="bg-Neutral-700 border-Neutral-300/8 mt-3 flex w-full items-center justify-between rounded-md border px-2 sm:px-3"
              >
                <div className="flex items-center gap-1.5 py-1.5 sm:gap-2 sm:py-2">
                  <WeatherIcon
                    condition={condition}
                    className="w-10 sm:w-7 md:w-8"
                  />
                  <p className="text-[18px] sm:text-sm md:text-[14px]">
                    {timeLabel}
                  </p>
                </div>

                <p className="text-[18px] font-medium sm:text-[12px]">
                  {Math.round(item.temperature)}°
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}