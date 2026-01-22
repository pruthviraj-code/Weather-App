import React, { useEffect, useState } from "react";
import GlobalSearch from "@/components/GlobalSearch";
import WeatherDisplay from "@/Sections/WeatherDisplay";
import "../App.css";
import { getWeatherData } from "@/services/api";

// export default function HeroSection() {
//   const [weatherData, setWeatherData] = useState();

//  const fetchDefaultWeather = async () => {
//     try {
//       const coords = { lat: 52.52, long: 13.41 };
//       const data = await getWeatherData(coords.lat, coords.long);
//       setWeatherData(data);
//     } catch (err) {
//       console.error("Error fetching default weather:", err);
//     }
//   };

//   useEffect(() => {
//     fetchDefaultWeather();
//   }, []);
 

//   return (
//     <div className="flex flex-col items-center justify-center px-4 pt-8 sm:px-8 sm:pt-9.5 md:px-12 lg:px-14">
//       <h1 className="font-bricolage-grotesque mb-6 px-3 text-center text-[clamp(3.375rem,3.208rem+0.83vw,3.625rem)] leading-14 font-semibold sm:mb-6 lg:text-[45px]">
//         How's the sky looking today?
//       </h1>

//       <GlobalSearch onWeatherFetch={setWeatherData} />

//       <div className="mt-6 grid w-full grid-cols-1 gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-[65%_30%] lg:gap-x-6 lg:gap-y-8">
//         {weatherData && <WeatherDisplay data={weatherData} />}
//       </div>
//     </div>
//   );
// }


export default function HeroSection() {
  const [weatherData, setWeatherData] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDefaultWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      // Default coordinates for Berlin
      const coords = { lat: 52.52, long: 13.41 };
      const data = await getWeatherData(coords.lat, coords.long);
      setWeatherData(data);
    } catch (err) {
      console.error("Error fetching default weather:", err);
      setError("Failed to load weather data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDefaultWeather();
  }, []);

  const handleWeatherFetch = (data) => {
    setWeatherData(data);
    setError(null);
  };

  const handleCityFetch = (city) => {
    setCityData(city);
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 pt-8 sm:px-8 sm:pt-9.5 md:px-12 lg:px-14">
      <h1 className="mb-6 px-3 text-center text-5xl leading-tight font-semibold sm:mb-6 lg:text-6xl">
        How's the sky looking today?
      </h1>

      <GlobalSearch 
        onWeatherFetch={handleWeatherFetch}
        onCityFetch={handleCityFetch}
      />

      <div className="mt-6 w-full sm:mt-8">
        {loading && (
          <div className="text-center text-gray-400 py-8">
            Loading weather data...
          </div>
        )}

        {error && (
          <div className="text-center text-red-400 py-8">
            {error}
          </div>
        )}

        {!loading && !error && weatherData && (
          <WeatherDisplay data={weatherData} city={cityData} />
        )}
      </div>
    </div>
  );
}
