export function getformatCityLabel(city) {
  if (!city) return "";
  // Only include values that exist and join with commas
  return [city.name, city.admin1, city.country].filter(Boolean).join(", ");
}