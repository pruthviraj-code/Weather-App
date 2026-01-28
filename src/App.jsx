import React, { useState } from 'react';
import Header from '@/Sections/Header';
import HeroSection from '@/Sections/HeroSection';
import ErrorComponent from '@/components/ErrorComponent';
import './index.css';

export default function App() {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  const handleRetry = () => {
    setHasError(false);
  };

  return (
    <div className='min-h-screen font-dm-sans max-w-360 mx-auto'>
      <Header />
      {hasError ? (
        <ErrorComponent onRetry={handleRetry} />
      ) : (
        <HeroSection onError={handleError} />
      )}
    </div>
  );
}