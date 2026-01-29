import React, { useState } from "react";
import Header from "@/Sections/Header";
import HeroSection from "@/Sections/HeroSection";
import ErrorComponent from "@/components/ErrorComponent";
import { UnitsProvider } from "./context/UnitsContext";
import "./index.css";

export default function App() {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  const handleRetry = () => {
    setHasError(false);
  };

  return (
    <UnitsProvider>
      <div className="font-dm-sans mx-auto min-h-screen max-w-360">
        <Header />
        {hasError ? (
          <ErrorComponent onRetry={handleRetry} />
        ) : (
          <HeroSection onError={handleError} />
        )}
      </div>
    </UnitsProvider>
  );
}
