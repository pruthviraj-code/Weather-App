import React from "react";
import Dropdown from "@/assets/images/icon-dropdown.svg";

export default function WeatherDisplaySkeleton() {
  return (
    <>
      <div className="col-span-1 grid grid-cols-2 gap-3 gap-y-4 sm:grid-cols-4 sm:gap-4 sm:gap-y-6">
        {/* Current Weather Skeleton */}
        <div className="relative col-span-2 sm:col-span-4">
          <div className="border-Neutral-300/8 bg-Neutral-800 h-48 w-full animate-pulse rounded-lg border sm:h-56 md:h-52" />
        </div>

        {/* Weather Details Skeleton - 4 cards */}
        {["Feels like", "Humidity", "Wind", "Precipitation"].map(
          (label, index) => (
            <div
              key={index}
              className="border-Neutral-300/8 bg-Neutral-800 flex animate-pulse flex-col justify-between rounded-lg border p-2.5 sm:p-3"
            >
              <p className="text-Neutral-300 text-xs sm:text-[13px]">{label}</p>
              <p className="mobile:pt-0 pt-4 text-lg font-medium sm:text-xl md:text-[20px]">
                —
              </p>
            </div>
          ),
        )}
      </div>

      {/* Daily Forecast Skeleton */}
      <div className="col-span-1 place-content-end lg:col-start-1 lg:row-start-2">
        <div className="mobile:mt-0 mt-4">
          <h3 className="mb-3 text-sm font-medium sm:mb-4 sm:text-base">
            Daily Forecast
          </h3>

          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
            {[...Array(7)].map((_, index) => (
              <div
                key={index}
                className="border-Neutral-300/8 bg-Neutral-800 flex w-full animate-pulse flex-col items-center gap-1.5 rounded-lg border p-2 sm:gap-2"
              >
                <div className="h-4 w-10" />
                <div className="h-16 w-16 sm:h-18 sm:w-18" />
                <div className="flex w-full justify-between gap-2">
                  <div className="h-4 w-8" />
                  <div className="h-4 w-8" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hourly Forecast Skeleton */}
      <div className="col-span-1 animate-pulse lg:col-start-2 lg:row-span-2 lg:row-start-1">
        {/* HEADER */}
        <div className="mobile:pt-3 bg-Neutral-800 flex w-full items-center justify-between rounded-t-md px-3 pt-3 pb-3 sm:px-4">
          <h3 className="text-sm font-medium sm:text-base">Hourly forecast</h3>
          <div className="bg-Neutral-600 flex items-center gap-1 rounded px-2 py-1">
            <p className="text-Neutral-300 text-sm">—</p>
            <img src={Dropdown} alt="dropdown-icon" className="h-4 w-4" />
          </div>
        </div>

        {/* LIST */}
        <div className="scrollbar-custom mobile:max-h-127.5 bg-Neutral-800 max-h-135 overflow-y-auto rounded-b-lg xl:max-h-142.5">
          <div className="px-3 pb-3 sm:px-4 sm:pb-4">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="border-Neutral-300/8 bg-Neutral-700 mt-3 flex w-full animate-pulse items-center justify-between rounded-md border px-2 py-2 sm:px-3"
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="h-8 w-8" />
                  <div className="h-5 w-16" />
                </div>
                <div className="h-5 w-12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
