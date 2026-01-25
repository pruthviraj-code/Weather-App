import Dropdown from "@/components/Dropdown";
import React from "react";
import rain from "@/assets/icons/icon-rain.webp";

const hourlyData = [
  { time: "3pm", temp: "20°" },
  { time: "4pm", temp: "19°" },
  { time: "5pm", temp: "18°" },
  { time: "6pm", temp: "17°" },
  { time: "7pm", temp: "16°" },
  { time: "8pm", temp: "15°" },
  { time: "9pm", temp: "14°" },
  { time: "10pm", temp: "13°" },
  { time: "11pm", temp: "12°" },
  { time: "11pm", temp: "12°" },
  { time: "11pm", temp: "12°" },
  { time: "11pm", temp: "12°" },
  { time: "11pm", temp: "12°" },
];
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function HourlyForecast() {
  return (
    <div className="">
      <div className="bg-Neutral-800 mobile:pt-3 relative z-10 flex w-full items-center justify-between rounded-t-md px-3 pt-3 sm:px-4">
        <h3 className="text-sm font-medium sm:text-base">Hourly forecast</h3>
        <Dropdown variant="Neutral600" label="Tuesday">
          {days.map((daysList, i) => (
            <div key={i} className="hover:bg-Neutral-700 text-[12px] pr-12  rounded-sm  dropdown-item p-1">{daysList}</div>
          ))}
        </Dropdown>
      </div>

      <div tabIndex={-1} className="bg-Neutral-800  mobile:mt-0 scrollbar-custom mobile:max-h-127.5 max-h-135 overflow-y-auto rounded-b-lg xl:max-h-142.5">
        <div className="px-3 pb-3 sm:px-4 sm:pb-4">
          {hourlyData.map((item, index) => (
            <div
              key={index}
              className="bg-Neutral-700 border-Neutral-300/8 mt-3 flex w-full items-center justify-between rounded-md border px-2 sm:px-3"
            >
              <div className="flex  items-center gap-1.5 py-1.5 sm:gap-2 sm:py-2">
                <img
                  src={rain}
                  alt="weatherIcon"
                  className="w-10 sm:w-7 md:w-8"
                />
                <p className="text-[18px] sm:text-sm md:text-[14px]">
                  {item.time}
                </p>
              </div>
              <p className="text-[18px] font-medium sm:text-[12px]">
                {item.temp}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
