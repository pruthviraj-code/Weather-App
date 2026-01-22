import React, { useState, useEffect, useRef } from "react";
import search from "@/assets/images/icon-search.svg";
import Button from "./Button";
// import { getCityName, searchCities, getWeatherData } from "@/services/api";
import {  searchCities, getWeatherData } from "@/services/api";

// export default function GlobalSearch({ onWeatherFetch , onCityFetch}) {
//   const [searchValue, setSearchValue] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const [suggestions, setSuggestions] = useState([]);
//   const [showOutline, setShowOutline] = useState(true);
//   const [selectedCity, setSelectedCity] = useState(null);
//   const searchRef = useRef(null);
//   const inputRef = useRef(null);
//   const selectRef = useRef(false);


//   // Search cities as user types
//   useEffect(() => {
//     if (selectRef.current === true) {
//       setSuggestions([]);
//       selectRef.current = false;
//       return;
//     }

//     const fetchCities = async () => {
//       if (searchValue.trim().length > 2) {
//         const cities = await searchCities(searchValue);
//         setSuggestions(cities);
//         setIsOpen(cities.length > 0);
//       } else {
//         setSuggestions([]);
//         setIsOpen(false);
//       }
//     };

//     const timer = setTimeout(() => {
//       fetchCities();
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [searchValue]);

//   // Close on click outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (searchRef.current && !searchRef.current.contains(e.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSelect = (city) => {
//     selectRef.current = true;
//     setSearchValue(`${city.name}, ${city.country} || ${city.name}`);
//     setSelectedCity(city);
//     setIsOpen(false);
//   };

//   const handleSearch = async () => {
//     if (selectedCity) {
//       const weatherData = await getWeatherData(
//         selectedCity.latitude,
//         selectedCity.longitude,
//       );
//       onWeatherFetch(weatherData);
//       onCityFetch(selectedCity);
//       console.log(weatherData);
//       console.log(selectedCity);
//     }
//   };

//   const handleFocus = () => {
//     if (searchValue.trim().length > 2) {
//       setIsOpen(suggestions.length > 0);
//     }
//     setShowOutline(true);
//     setTimeout(() => {
//       setShowOutline(false);
//     }, 1000);
//   };

//   return (
//     <div className="flex w-full max-w-full flex-col items-stretch gap-3 pt-4 sm:max-w-125 sm:flex-row xl:max-w-145">
//       <div className="relative w-full" ref={searchRef}>
//         <label
//           htmlFor="search"
//           className={`bg-Neutral-800 flex w-full items-center rounded-lg px-4 py-2 transition-all ${showOutline ? "focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-white" : ""}`}
//         >
//           <img src={search} alt="search_icon" className="w-5 shrink-0" />
//           <input
//             id="search"
//             ref={inputRef}
//             type="text"
//             value={searchValue}
//             onChange={(e) => setSearchValue(e.target.value)}
//             onFocus={handleFocus}
//             autoComplete="off"
//             placeholder="Search for place..."
//             className="bg-Neutral-800 w-full px-3 text-base text-white placeholder:text-gray-400 focus:outline-none"
//           />
//         </label>

//         {/* Suggestions Dropdown */}
//         {isOpen && suggestions.length > 0 && (
//           <div className="bg-Neutral-800 scrollbar-custom absolute top-full right-0 left-0 z-50 mt-2 max-h-60 overflow-y-auto rounded-lg shadow-lg">
//             {suggestions.map((city) => (
//               <div
//                 key={city.id}
//                 onClick={() => handleSelect(city)}
//                 className="hover:bg-Neutral-700 cursor-pointer px-4 py-2.5 text-white transition-colors first:rounded-t-lg last:rounded-b-lg"
//               >
//                 <div className="font-medium">{city.name}</div>
//                 <div className="text-sm text-gray-400">
//                   {city.admin1 && `${city.admin1}, `}
//                   {city.country}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <Button variant={"full"} onClick={handleSearch}>
//         Search
//       </Button>
//     </div>
//   );
// }


export default function GlobalSearch({ onWeatherFetch, onCityFetch }) {
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showOutline, setShowOutline] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);
  const selectRef = useRef(false);

  // Search cities as user types
  useEffect(() => {
    if (selectRef.current === true) {
      setSuggestions([]);
      selectRef.current = false;
      return;
    }

    const fetchCities = async () => {
      if (searchValue.trim().length > 2) {
        setIsSearching(true);
        const cities = await searchCities(searchValue);
        setSuggestions(cities);
        setIsOpen(cities.length > 0);
        setIsSearching(false);
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    };

    const timer = setTimeout(() => {
      fetchCities();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (city) => {
    selectRef.current = true;
    setSearchValue(`${city.name}, ${city.country}`);
    setSelectedCity(city);
    setIsOpen(false);
  };

  const handleSearch = async () => {
    if (!selectedCity) {
      alert("Please select a city from the suggestions");
      return;
    }

    try {
      const weatherData = await getWeatherData(
        selectedCity.latitude,
        selectedCity.longitude
      );
      onWeatherFetch(weatherData);
      if (onCityFetch) {
        onCityFetch(selectedCity);
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
      alert("Failed to fetch weather data. Please try again.");
    }
  };

  const handleFocus = () => {
    if (searchValue.trim().length > 2) {
      setIsOpen(suggestions.length > 0);
    }
    setShowOutline(true);
    setTimeout(() => {
      setShowOutline(false);
    }, 1000);
  };

  return (
    <div className="flex w-full max-w-full flex-col items-stretch gap-3 pt-4 sm:max-w-125 sm:flex-row xl:max-w-145">
      <div className="relative w-full" ref={searchRef}>
        <label
          htmlFor="search"
          className={`bg-Neutral-800 flex w-full items-center rounded-lg px-4 py-2 transition-all ${showOutline ? "focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-white" : ""}`}
        >
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            id="search"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={handleFocus}
            autoComplete="off"
            placeholder="Search for place..."
            className="bg-transparent w-full px-3 text-base text-white placeholder:text-gray-400 focus:outline-none"
          />
        </label>

        {/* Suggestions Dropdown */}
        {isOpen && suggestions.length > 0 && (
          <div className="bg-Neutral-800 absolute top-full right-0 left-0 z-50 mt-2 max-h-60 overflow-y-auto rounded-lg shadow-lg">
            {suggestions.map((city) => (
              <div
                key={city.id}
                onClick={() => handleSelect(city)}
                className="hover:bg-Neutral-700 cursor-pointer px-4 py-2.5 text-white transition-colors first:rounded-t-lg last:rounded-b-lg"
              >
                <div className="font-medium">{city.name}</div>
                <div className="text-sm text-gray-400">
                  {city.admin1 && `${city.admin1}, `}
                  {city.country}
                </div>
              </div>
            ))}
          </div>
        )}

        {isSearching && (
          <div className="bg-Neutral-800 absolute top-full right-0 left-0 z-50 mt-2 rounded-lg px-4 py-2.5 text-center text-gray-400">
            Searching...
          </div>
        )}
      </div>

      <button
        onClick={handleSearch}
        className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors whitespace-nowrap"
      >
        Search
      </button>
    </div>
  );
}