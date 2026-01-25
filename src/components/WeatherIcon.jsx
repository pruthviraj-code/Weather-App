import React from "react";

import iconDrizzle from "@/assets/icons/icon-drizzle.webp";
import iconFog from "@/assets/icons/icon-fog.webp";
import iconOvercast from "@/assets/icons/icon-overcast.webp";
import iconPartlyCloud from "@/assets/icons/icon-partly-cloudy.webp";
import iconRain from "@/assets/icons/icon-rain.webp";
import iconSnow from "@/assets/icons/icon-snow.webp";
import iconStorm from "@/assets/icons/icon-storm.webp";
import iconSunny from "@/assets/icons/icon-sunny.webp";

const iconsMap = {
  "icon-drizzle": iconDrizzle,
  "icon-fog": iconFog,
  "icon-overcast": iconOvercast,
  "icon-partly-cloud": iconPartlyCloud,
  "icon-rain": iconRain,
  "icon-snow": iconSnow,
  "icon-storm": iconStorm,
  "icon-sunny": iconSunny,
};

export default function WeatherIcon({ condition, className, alt }) {
  const src = iconsMap[condition] || iconSunny; // fallback
  return <img src={src} alt={alt || condition} className={className} />;
}
