// const WEATHER_API = "https://api.open-meteo.com/v1/forecast";
// const GEOCODING_API = "https://geocoding-api.open-meteo.com/v1/search";
// const REVERSE_GEOCODING_API =
//   "https://api.bigdatacloud.net/data/reverse-geocode-client";

// export const getWeatherData = async (latitude = 52.52, longitude = 13.41) => {
//   try {
//     const response = await fetch(
//       `${WEATHER_API}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`,
//     );

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching weather:", error);
//     throw error;
//   }
// };



// export const getCityName = async (latitude, longitude) => {
//   try {
//     const response = await fetch(
//       `${REVERSE_GEOCODING_API}?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
//     );
//     const data = await response.json();
//     return data.city || data.locality || "Unknown location";
//   } catch (error) {
//     console.error("Error fetching city:", error);
//     return "Unknown location";
//   }
// };

// // Search cities by name
// export const searchCities = async (cityName) => {
//   try {
//     const response = await fetch(
//       `${GEOCODING_API}?name=${cityName}&count=10&language=en&format=json`
//     );
//     const data = await response.json();
//     return data.results  || [];
//   } catch (error) {
//     console.error('Error searching cities:', error);
//     return [];
//   }
// };





const WEATHER_API = "https://api.open-meteo.com/v1/forecast";
const GEOCODING_API = "https://geocoding-api.open-meteo.com/v1/search";

export const getWeatherData = async (latitude = 52.52, longitude = 13.41) => {
  try {
    const response = await fetch(
      `${WEATHER_API}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`
    );

    if (!response.ok) {
      throw new Error('Weather API request failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
};

export const searchCities = async (cityName) => {
  try {
    const response = await fetch(
      `${GEOCODING_API}?name=${encodeURIComponent(cityName)}&count=10&language=en&format=json`
    );
    
    if (!response.ok) {
      throw new Error('City search failed');
    }
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error searching cities:', error);
    return [];
  }
};
