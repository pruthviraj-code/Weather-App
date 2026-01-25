import React, { useState, useEffect, useRef } from "react";
import search from "@/assets/images/icon-search.svg";
import Button from "./Button";
import { searchCities } from "@/services/api";

/* -------------------- HELPER FUNCTION -------------------- */
function formatCityLabel(city) {
  if (!city) return "";
  // Only include values that exist and join with commas
  return [city.name, city.admin1, city.country].filter(Boolean).join(", ");
}

export default function GlobalSearch({ onConfirmCity }) {
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [draftCity, setDraftCity] = useState(null);
  const [showOutline, setShowOutline] = useState(true);

  const searchRef = useRef(null);
  const skipNextFetchRef = useRef(false);
  const requestIdRef = useRef(0);

  /* -------------------- FETCH SUGGESTIONS -------------------- */
  useEffect(() => {
    if (skipNextFetchRef.current) {
      skipNextFetchRef.current = false;
      return;
    }

    if (searchValue.trim().length <= 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const currentRequestId = ++requestIdRef.current;

    const timer = setTimeout(async () => {
      const cities = await searchCities(searchValue);

      // prevent stale async update
      if (currentRequestId !== requestIdRef.current) return;

      setSuggestions(cities);
      setIsOpen(cities.length > 0);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  /* -------------------- CLICK OUTSIDE -------------------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* -------------------- INPUT CHANGE -------------------- */
  const handleChange = (e) => {
    setSearchValue(e.target.value);
    setDraftCity(null); // invalidate previous selection
  };

  /* -------------------- SELECT CITY -------------------- */
  const handleSelect = (city) => {
    if (!city?.name) return; // prevent invalid selection

    skipNextFetchRef.current = true;
    setSearchValue(formatCityLabel(city));
    setDraftCity(city);
    setSuggestions([]);
    setIsOpen(false);
  };

  /* -------------------- CONFIRM SEARCH -------------------- */
  const handleSearch = () => {
    if (!draftCity) return;
    onConfirmCity(draftCity);
  };

  /* -------------------- FOCUS UI -------------------- */
  const handleFocus = () => {
    if (searchValue.trim().length > 2) {
      setIsOpen(suggestions.length > 0);
    }

    setShowOutline(true);
    setTimeout(() => setShowOutline(false), 1000);
  };

  return (
    <div className="flex w-full max-w-full flex-col items-stretch gap-3 pt-4 sm:max-w-125 sm:flex-row xl:max-w-145">
      <div className="relative w-full" ref={searchRef}>
        <label
          htmlFor="search"
          className={`bg-Neutral-800 flex w-full items-center rounded-lg px-4 py-2 transition-all ${
            showOutline
              ? "focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-white"
              : ""
          }`}
        >
          <img src={search} alt="search_icon" className="w-5 shrink-0" />
          <input
            id="search"
            type="text"
            value={searchValue}
            onChange={handleChange}
            onFocus={handleFocus}
            autoComplete="off"
            placeholder="Search for place..."
            className="bg-Neutral-800 w-full px-3 text-base text-white placeholder:text-gray-400 focus:outline-none"
          />
        </label>

        {isOpen && suggestions.length > 0 && (
          <div className="bg-Neutral-800 scrollbar-custom absolute top-full right-0 left-0 z-50 mt-2 max-h-60 overflow-y-auto rounded-lg shadow-lg">
            {suggestions.map((city) => (
              <div
                key={city.id}
                onClick={() => handleSelect(city)}
                className="hover:bg-Neutral-700 cursor-pointer px-4 py-2.5 text-white transition-colors first:rounded-t-lg last:rounded-b-lg"
              >
                <div className="font-medium">{city.name || ""}</div>
                <div className="text-sm text-gray-400">
                  {formatCityLabel(city)
                    .split(",")
                    .slice(1) // remove name from display
                    .join(", ")}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button variant="full" onClick={handleSearch} disabled={!draftCity}>
        Search
      </Button>
    </div>
  );
}
