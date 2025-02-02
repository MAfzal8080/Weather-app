export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

export interface ForecastData {
  dt: number;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

export interface WeatherContextType {
  weatherData: WeatherData | null;
  forecastData: ForecastData[];
  loading: boolean;
  error: string | null;
  searchCity: (city: string) => Promise<void>;
  toggleUnit: () => void;
  isCelsius: boolean;
}