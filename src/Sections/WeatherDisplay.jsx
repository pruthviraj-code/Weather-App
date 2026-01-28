import React from "react";
import CurrentWeather from "./CurrentWeather";
import HourlyForecast from "./HourlyForecast";
import WeatherDetails from "@/components/WeatherDetails";
import DailyForecast from "./DailyForecast";
import { getWeatherCondition } from "@/helpers/getWeatherCondition";


export default function WeatherDisplay({ weatherData, cityData }) {
  
  // ---- CURRENT WEATHER ----
  const currentWeather = {
    temperature: weatherData?.current?.temperature_2m,
    windSpeed: weatherData?.current?.wind_speed_10m,
    precipitation: weatherData?.current?.precipitation,
    time: weatherData?.current?.time,
  };

  // ---- CURRENT WEATHER UNITS ----
  const currentWeatherUnits = {
    temperatureUnit: weatherData?.current_units?.temperature_2m,
    windSpeedUnit: weatherData?.current_units?.wind_speed_10m,
    precipitationUnit: weatherData?.current_units?.precipitation,
    timeUnit: weatherData?.current_units?.time,
  };

  // ---- HOURLY WEATHER ----
  const hourlyWeather = {
    temperature: weatherData?.hourly?.temperature_2m,
    relativeHumidity: weatherData?.hourly?.relative_humidity_2m?.[0],
    windSpeed: weatherData?.hourly?.wind_speed_10m?.[0],
    precipitation: weatherData?.hourly?.precipitation?.[0],
    time: weatherData?.hourly?.time,
  };

  // ---- HOURLY WEATHER UNITS ----
  const hourlyWeatherUnits = {
    temperatureUnit: weatherData?.hourly_units?.temperature_2m,
    relativeHumidityUnit: weatherData?.hourly_units?.relative_humidity_2m,
    windSpeedUnit: weatherData?.hourly_units?.wind_speed_10m,
    precipitationUnit: weatherData?.hourly_units?.precipitation,
    timeUnit: weatherData?.hourly_units?.time,
  };

  
    const currentCity = {
      name: cityData?.name,
      country: cityData?.country,
    };

  const condition = getWeatherCondition({
    temperature: currentWeather.temperature,
    precipitation: currentWeather.precipitation ?? 0,
    windSpeed: currentWeather.windSpeed,
  });

    const hourlyData = {
    time: weatherData.hourly.time,
    temperature_2m: weatherData.hourly.temperature_2m,
    precipitation: weatherData.hourly.precipitation,
    wind_speed_10m: weatherData.hourly.wind_speed_10m,
  };

  return (
    <>
      <div className="col-span-1 grid grid-cols-2 gap-3 gap-y-4 sm:grid-cols-4 sm:gap-4 sm:gap-y-6">
        <CurrentWeather
          temperature={currentWeather.temperature}
          country={currentCity.country}
          name={currentCity.name}
          time={currentWeather.time}
          condition={condition}
        />
        <WeatherDetails
          temperature={currentWeather.temperature}
          temperatureUnit={currentWeatherUnits.temperatureUnit}
          relativeHumidity={hourlyWeather.relativeHumidity}
          relativeHumidityUnit={hourlyWeatherUnits.relativeHumidityUnit}
          precipitation={hourlyWeather.precipitation}
          precipitationUnit={hourlyWeatherUnits.precipitationUnit}
          windSpeed={hourlyWeather.windSpeed}
          windSpeedUnit={hourlyWeatherUnits.windSpeedUnit}
        />
      </div>

      <div className="col-span-1 place-content-end lg:col-start-1 lg:row-start-2">
        <DailyForecast  hourlyData={hourlyData} />
      </div>

      <div className="col-span-1 lg:col-start-2 lg:row-span-2 lg:row-start-1">
        <HourlyForecast  hourlyData={hourlyData}/>
      </div>
    </>
  );
}
