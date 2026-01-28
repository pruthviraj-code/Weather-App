import React from "react";

export default function SearchLoadingAnimation() {
  return (
    <div className="flex items-center justify-start gap-2 px-4 py-2.5">
      <div className="relative h-5 w-5 animate-spin [animation-duration:2s]">
        {[...Array(6)].map((_, index) => {
          const angle = (index * 60) * (Math.PI / 180);
          const x = Math.cos(angle) * 8;
          const y = Math.sin(angle) * 8;
          return (
            <div
              key={index}
              className="absolute h-1 w-1 rounded-full bg-white"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
                opacity: 1 - index * 0.15,
              }}
            />
          );
        })}
      </div>
      <span className="text-Neutral-0 text-sm">Search in progress . . .</span>
    </div>
  );
}