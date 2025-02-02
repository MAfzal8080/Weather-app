import React, { useState } from 'react';
import { useWeather } from '../context/WeatherContext';
import { Thermometer, Droplets, Wind } from 'lucide-react';

const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

export const WeatherDisplay: React.FC = () => {
  const { weatherData, isCelsius, forecastData, toggleUnit } = useWeather();
  // console.log(weatherData);
  const [time, setTime] = useState({hour: 0, min: 0, am: '', day: ''});
  setInterval(function () {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const d = new Date();
    const day = weekday[d.getDay()];
    const now = new Date();
    const hours = now.getHours();
    const hr = hours > 12 ? hours-12 : hours;
    const minutes = now.getMinutes();
    const ab = hours >= 12 ? "PM" : "AM";
    setTime({hour: hr, min: minutes, am: ab, day: day})
  }, 1000);

  if (!weatherData) return null;

  const convertTemp = (temp: number) => {
    return isCelsius ? temp : (temp * 9/5) + 32;
  };

  const temp = convertTemp(weatherData.main.temp);

  return (
    <div className="bg-cyan-500/30 backdrop-blur-sm rounded-lg shadow-lg p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">{weatherData.name}</h2>
        <span className='text-2xl font-bold text-white'>{time.hour}:{time.min} {time.am}</span>
        <button
          onClick={toggleUnit}
          className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
        >
          °{isCelsius ? 'C' : 'F'}
        </button>
      </div>
      <div className="flex justify-center mb-6">
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
          alt={weatherData.weather[0].description}
          className="w-32 h-32"
        />
      </div>

      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-200">
          {Math.round(temp/10)}°{isCelsius ? 'C' : 'F'}
        </h1>
        <p className="text-gray-200 capitalize">{weatherData.weather[0].description}</p>
        <p className='text-gray-200 capitalize'>{time.day}</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
          <Thermometer className="text-orange-500 mb-2" />
          <span className="text-sm text-gray-600">Feels like</span>
          <span className="font-semibold">
            {Math.round(weatherData.main.feels_like/10)}°{isCelsius ? 'C' : 'F'}
          </span>
        </div>
        <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
          <Droplets className="text-blue-500 mb-2" />
          <span className="text-sm text-gray-600">Humidity</span>
          <span className="font-semibold">{weatherData.main.humidity}%</span>
        </div>
        <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
          <Wind className="text-green-500 mb-2" />
          <span className="text-sm text-gray-600">Wind</span>
          <span className="font-semibold">{Math.round(weatherData.wind.speed)} m/s</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">5-Day Forecast</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {forecastData.map((day, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="font-medium text-gray-700 mb-2">{formatDate(day.dt)}</p>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt={day.weather[0].description}
                className="mx-auto w-12 h-12"
              />
              <p className="text-lg font-semibold text-gray-800">
                {Math.round(convertTemp(day.main.temp/10))}°{isCelsius ? 'C' : 'F'}
              </p>
              <p className="text-sm text-gray-600 capitalize">{day.weather[0].description}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};