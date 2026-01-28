import React, { useEffect, useState } from "react";
import GlobalSearch from "@/components/GlobalSearch";
import WeatherDisplay from "@/Sections/WeatherDisplay";
import WeatherDisplaySkeleton from "../components/WeatherDisplaySkeleton";
import "../App.css";
import { getWeatherData } from "@/services/api";
import NoResultsFound from "@/components/NoResultsFound";

export default function HeroSection({ onError }) {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [showNoResults, setShowNoResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /* -------------------- DEFAULT CITY -------------------- */
  useEffect(() => {
    setSelectedCity({
      name: "Berlin",
      country: "Germany",
      latitude: 52.52,
      longitude: 13.41,
    });
  }, []);

  /* -------------------- FETCH WEATHER -------------------- */
  useEffect(() => {
    if (!selectedCity) return;

    const fetchWeather = async () => {
      setIsLoading(true);
      try {
        const data = await getWeatherData(
          selectedCity.latitude,
          selectedCity.longitude,
        );
        setWeatherData(data);
        setShowNoResults(false);
      } catch (err) {
        console.error("Error fetching weather:", err);
        if (onError) onError();
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [selectedCity, onError]);

  /* -------------------- HANDLE NO RESULTS -------------------- */
  const handleNoResults = () => {
    setShowNoResults(true);
  };

  /* -------------------- HANDLE CITY SELECTION -------------------- */
  const handleCitySelect = (city) => {
    setShowNoResults(false);
    setSelectedCity(city);
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 pt-8 sm:px-8 sm:pt-9.5 md:px-12 lg:px-14">
      <h1 className="font-bricolage-grotesque mb-6 px-3 text-center text-[clamp(3.375rem,3.208rem+0.83vw,3.625rem)] leading-14 font-semibold sm:mb-6 lg:text-[45px]">
        How's the sky looking today?
      </h1>

      <GlobalSearch
        onConfirmCity={handleCitySelect}
        onNoResults={handleNoResults}
      />

      <div className="mt-6 grid w-full grid-cols-1 gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-[65%_30%] lg:gap-x-6 lg:gap-y-8">
        {showNoResults ? (
          <NoResultsFound />
        ) : isLoading || !weatherData ? (
          <WeatherDisplaySkeleton />
        ) : (
          <WeatherDisplay weatherData={weatherData} cityData={selectedCity} />
        )}
      </div>
    </div>
  );
}
