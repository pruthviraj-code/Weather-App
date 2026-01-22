import React from "react";
import rainy from "@/assets/images/icon-rain.webp";

const dailyData = [
  { day: "Tue", high: "65°", low: "52°" },
  { day: "Wed", high: "65°", low: "52°" },
  { day: "Thu", high: "65°", low: "52°" },
  { day: "Fri", high: "65°", low: "52°" },
  { day: "Sat", high: "65°", low: "52°" },
  { day: "Sun", high: "65°", low: "52°" },
  { day: "Mon", high: "65°", low: "52°" },
];

export default function DailyForecast() {
  return (
    <div className="mt-4 mobile:mt-0">
      <h3 className="text-sm sm:text-base font-medium mb-3 sm:mb-4">
        Daily Forecast
      </h3>
      
      <div className="grid  grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2">
        {dailyData.map((item, index) => (
          <div 
            key={index}
            className="bg-Neutral-800 border border-Neutral-300/8 flex w-full flex-col items-center gap-1.5 sm:gap-2 rounded-lg p-2"
          >
            <p className="text-xs sm:text-[12px]">{item.day}</p>
            <img src={rainy} alt="" className="w-10 sm:w-12" />
            <div className="flex  w-full justify-between ">
              <p className="text-[12px]  font-light">{item.high}</p>
              <p className="text-[12px]  font-light text-Neutral-400">{item.low}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}