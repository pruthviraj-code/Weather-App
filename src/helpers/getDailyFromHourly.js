// Converts hourly data into 7-day summary
export function getDailyFromHourly(hourly) {
  const dailyMap = {};

  hourly.time.forEach((t, i) => {
    const date = t.split("T")[0]; // YYYY-MM-DD
    if (!dailyMap[date]) {
      dailyMap[date] = {
        temperature_max: hourly.temperature_2m[i],
        temperature_min: hourly.temperature_2m[i],
        precipitation_sum: hourly.precipitation[i] ?? 0,
        wind_max: hourly.wind_speed_10m[i] ?? 0,
      };
    } else {
      dailyMap[date].temperature_max = Math.max(
        dailyMap[date].temperature_max,
        hourly.temperature_2m[i]
      );
      dailyMap[date].temperature_min = Math.min(
        dailyMap[date].temperature_min,
        hourly.temperature_2m[i]
      );
      dailyMap[date].precipitation_sum += hourly.precipitation[i] ?? 0;
      dailyMap[date].wind_max = Math.max(
        dailyMap[date].wind_max,
        hourly.wind_speed_10m[i] ?? 0
      );
    }
  });

  // Convert to array and limit to 7 days
  return Object.entries(dailyMap)
    .slice(0, 7)
    .map(([date, data]) => ({
      date,
      ...data,
    }));
}
