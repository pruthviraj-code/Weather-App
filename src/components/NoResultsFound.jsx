import React from "react";

export default function NoResultsFound() {
  return (
    <div className="ab bg-Neutral-900 col-span-full flex items-center justify-center rounded-lg p-12 text-center">
      <div>
        <h2 className="mb-2 text-2xl font-semibold text-white">
          No results found
        </h2>
        <p className="text-gray-400">Try searching for a different city</p>
      </div>
    </div>
  );
}
