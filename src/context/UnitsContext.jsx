import React, { createContext, useContext, useState } from 'react';

const UnitsContext = createContext();

export const useUnits = () => {
  const context = useContext(UnitsContext);
  if (!context) {
    throw new Error('useUnits must be used within a UnitsProvider');
  }
  return context;
};

export const UnitsProvider = ({ children }) => {
  const [temperatureUnit, setTemperatureUnit] = useState('celsius');
  const [windSpeedUnit, setWindSpeedUnit] = useState('kmh');
  const [precipitationUnit, setPrecipitationUnit] = useState('mm');

  // Helper functions for unit conversion
  const convertTemperature = (celsius) => {
    if (temperatureUnit === 'fahrenheit') {
      return Math.round((celsius * 9/5) + 32);
    }
    return Math.round(celsius);
  };

  const convertWindSpeed = (kmh) => {
    if (windSpeedUnit === 'mph') {
      return Math.round(kmh * 0.621371);
    }
    return Math.round(kmh);
  };

  const convertPrecipitation = (mm) => {
    if (precipitationUnit === 'in') {
      return (mm * 0.0393701).toFixed(2);
    }
    return mm.toFixed(1);
  };

  const value = {
    temperatureUnit,
    setTemperatureUnit,
    windSpeedUnit,
    setWindSpeedUnit,
    precipitationUnit,
    setPrecipitationUnit,
    convertTemperature,
    convertWindSpeed,
    convertPrecipitation,
  };

  return (
    <UnitsContext.Provider value={value}>
      {children}
    </UnitsContext.Provider>
  );
};