import React from "react";
import IconError from "@/assets/images/icon-error.svg";
import IconRetry from "@/assets/images/icon-retry.svg";
import Button from "@/components/Button";

export default function ErrorComponent({ onRetry }) {
  return (
    <div className="bg-Neutral-900 col-span-full flex items-center justify-center rounded-lg p-12 text-center">
      <div className="max-w-md flex flex-col items-center">
        <div className="mb-8">
          <img src={IconError} alt="error-icon" className="h-10 w-10" />
        </div>

        <h1 className="mb-3 text-3xl font-bold text-white">
          Something Went Wrong
        </h1>

        <p className="mb-10 text-sm text-gray-400">
          We couldn't connect to the server (API error). Please try again in few
          moments
        </p>

        <Button
          onClick={onRetry}
          className="bg-Neutral-800 hover:bg-Neutral-700 focus:outline-white focus:ring-white inline-flex items-center gap-2 px-2 py-1 text-[12px]"
        >
          <img src={IconRetry} alt="retry-icon" className="h-3.5 w-3.5" />
          Retry
        </Button>
      </div>
    </div>
  );
}