import React from "react";
import CurrentWeather from "./CurrentWeather";
import HourlyForecast from "./HourlyForecast";
import WeatherDetails from "@/components/WeatherDetails";
import DailyForecast from "./DailyForecast";

// export default function WeatherDisplay({ data }) {
// const currentWeather = {
//   temperature : data?.current?.temperature_2m
// }

//   return (
//     <>
//       <div className="col-span-1 grid grid-cols-2 gap-3 gap-y-4 sm:grid-cols-4 sm:gap-4 sm:gap-y-6">
//         <CurrentWeather temperature={currentWeather.temperature} />
//         <WeatherDetails />
//       </div>

//       <div className="col-span-1 place-content-end lg:col-start-1 lg:row-start-2">
//         <DailyForecast />
//       </div>

//       <div className="col-span-1 lg:col-start-2 lg:row-span-2 lg:row-start-1">
//         <HourlyForecast />
//       </div>
//     </>
//   );
// }

export default function WeatherDisplay({ data, city  }) {
  if (!data || !data.current) {
    return (
      <div className="py-8 text-center text-gray-400">
        No weather data available
      </div>
    );
  }

  const currentWeather = {
    temperature: data.current.temperature_2m,
    apparentTemperature: data.current.apparent_temperature,
    humidity: data.current.relative_humidity_2m,
    windSpeed: data.current.wind_speed_10m,
    precipitation: data.current.precipitation || 0,
    weatherCode: data.current.weather_code,
    isDay: data.current.is_day,
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {/* Current Weather Card */}
      <div className="bg-Neutral-800 rounded-lg p-6">
        <h2 className="mb-4 text-xl font-semibold">
          {city ? `${city.name}, ${city.country}` : "Current Weather"}
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-6xl font-bold">
              {Math.round(currentWeather.temperature)}°
            </div>
            <div className="mt-2 text-gray-400">
              Feels like {Math.round(currentWeather.apparentTemperature)}°
            </div>
          </div>
          <div className="text-4xl">{currentWeather.isDay ? "☀️" : "🌙"}</div>
        </div>





   <div className="bg-Neutral-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Weather Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-gray-400 text-sm">Humidity</div>
            <div className="text-xl font-semibold">{currentWeather.humidity}%</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Wind Speed</div>
            <div className="text-xl font-semibold">{Math.round(currentWeather.windSpeed)} km/h</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Precipitation</div>
            <div className="text-xl font-semibold">{currentWeather.precipitation} mm</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Weather Code</div>
            <div className="text-xl font-semibold">{currentWeather.weatherCode}</div>
          </div>
        </div>
      </div>


      </div>
    </div>
  );
}
