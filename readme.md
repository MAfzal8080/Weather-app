# Weather Lens

## Overview
This is a weather application built using React and TypeScript. It allows users to search for weather conditions of a city and view the current weather along with a 5-day forecast. The app uses the OpenWeatherMap API for fetching weather data and supports temperature unit toggling between Celsius and Fahrenheit.

## Features
- Search for a city to view its current weather and forecast.
- Displays real-time weather data with temperature, humidity, and wind speed.
- Shows a 5-day weather forecast.
- Saves the last searched city in local storage.
- Error handling and display for API request failures.
- Uses React Context API for state management.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/weather-app.git
   ```
2. Navigate to the project directory:
   ```sh
   cd weather-app
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```sh
   VITE_API_KEY=your_api_key_here
   ```
5. Start the development server:
   ```sh
   npm run dev
   ```

## Project Structure
```
weather-app/
│── src/
│   │── components/
│   │   ├── SearchBar.tsx
│   │   ├── ErrorDisplay.tsx
│   │── context/
│   │   ├── WeatherContext.tsx
│   │── App.tsx
│   │── main.tsx
│── public/
│── index.css
│── package.json
│── README.md
```

## Technologies Used
- React (TypeScript)
- Axios (for API requests)
- OpenWeatherMap API
- Tailwind CSS (for styling)
- React Context API

## Usage
1. Enter a city name in the search bar and press enter.
2. View the current weather details and the 5-day forecast.
3. The last searched city is saved and loaded on the next visit.
4. Toggle between Celsius and Fahrenheit.

## Credits
- OpenWeatherMap API for weather data.
- Lucide React for icons.

## License
This project is licensed under the MIT License.

