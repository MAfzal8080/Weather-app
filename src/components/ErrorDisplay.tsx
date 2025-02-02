import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

export const ErrorDisplay: React.FC = () => {
  const { error } = useWeather();

  if (!error) return null;

  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 w-full max-w-md">
      <div className="flex items-center">
        <AlertCircle className="text-red-500 mr-2" />
        <p className="text-red-700">{error}</p>
      </div>
    </div>
  );
};