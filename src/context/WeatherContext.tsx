import React, { createContext, useState, useCallback, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';
import { WeatherData, WeatherContextType, ForecastData } from '../types/weather';
import toast from 'react-hot-toast';

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCelsius, setIsCelsius] = useState(true);

  const searchCity = useCallback(async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}`);

      const forecast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${import.meta.env.VITE_API_KEY}`);
      // console.log(forecast)

      const dailyForecast = forecast.data.list.filter((reading: ForecastData, index: number) => index % 8 === 0).slice(0, 5);
      
      setWeatherData(response.data);
      setForecastData(dailyForecast);
      // setWeatherData()
      localStorage.setItem('lastCity', city);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setError(message);
      toast.error('Could not fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleUnit = useCallback(() => {
    setIsCelsius(prev => !prev);
  }, []);

  // Polling every 30 seconds
  useEffect(() => {
    if (!weatherData?.name) return;

    const interval = setInterval(() => {
      searchCity(weatherData.name);
    }, 30000);

    return () => clearInterval(interval);
  }, [weatherData?.name, searchCity]);

  const value = useMemo(() => ({
    weatherData,
    forecastData,
    loading,
    error,
    searchCity,
    toggleUnit,
    isCelsius
  }), [weatherData, forecastData, loading, error, searchCity, toggleUnit, isCelsius]);

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};