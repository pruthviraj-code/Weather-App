
export function getWeatherCondition({ temperature, precipitation, windSpeed }) {
  // Precipitation-based
  if (precipitation > 0) {
    if (temperature <= 0) return "icon-snow";
    if (precipitation < 2) return "icon-drizzle"; 
    return "icon-rain";
  }

  // Strong wind
  if (windSpeed >= 20) return "icon-storm";

  // Temperature-based
  if (temperature >= 25) return "icon-sunny";
  if (temperature > 0) return "icon-partly-cloud";
  return "icon-overcast";
}
