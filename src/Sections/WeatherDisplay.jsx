import React from "react";
import CurrentWeather from "./CurrentWeather";
import HourlyForecast from "./HourlyForecast";
import WeatherDetails from "@/components/WeatherDetails";
import DailyForecast from "./DailyForecast";

export default function WeatherDisplay({ weatherData, cityData }) {
  console.log(weatherData);
  console.log(cityData);
  const currentWeather = {
    temperature: weatherData?.current?.temperature_2m,
    time: weatherData?.current?.time,
  };
  const currentCity = {
    name: cityData?.name,
    country: cityData?.country,
  };

  return (
    <>
      <div className="col-span-1 grid grid-cols-2 gap-3 gap-y-4 sm:grid-cols-4 sm:gap-4 sm:gap-y-6">
        <CurrentWeather
          temperature={currentWeather.temperature}
          country={currentCity.country}
          name={currentCity.name}
          time={currentWeather.time}
        />
        <WeatherDetails />
      </div>

      <div className="col-span-1 place-content-end lg:col-start-1 lg:row-start-2">
        <DailyForecast />
      </div>

      <div className="col-span-1 lg:col-start-2 lg:row-span-2 lg:row-start-1">
        <HourlyForecast />
      </div>
    </>
  );
}
