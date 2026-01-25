const WEATHER_API = "https://api.open-meteo.com/v1/forecast";
const GEOCODING_API = "https://geocoding-api.open-meteo.com/v1/search";
const REVERSE_GEOCODING_API =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

export const getWeatherData = async (latitude = 52.52, longitude = 13.41) => {
  try {
    const response = await fetch(
      `${WEATHER_API}
?latitude=${latitude}
&longitude=${longitude}
&current=temperature_2m,wind_speed_10m,precipitation
&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation
`,
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
};

export const getCityName = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `${REVERSE_GEOCODING_API}?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
    );
    const data = await response.json();
    return data.city || data.locality || "Unknown location";
  } catch (error) {
    console.error("Error fetching city:", error);
    return "Unknown location";
  }
};

// Search cities by name
export const searchCities = async (cityName) => {
  try {
    const response = await fetch(
      `${GEOCODING_API}?name=${cityName}&count=10&language=en&format=json`,
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error searching cities:", error);
    return [];
  }
};
