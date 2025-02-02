import { WeatherProvider } from './context/WeatherContext';
import { SearchBar } from './components/SearchBar';
import { WeatherDisplay } from './components/WeatherDisplay';
import { ErrorDisplay } from './components/ErrorDisplay';
import { Toaster } from 'react-hot-toast';
import { Cloud } from 'lucide-react';

function App() {
  return (
    <WeatherProvider>
      <div className="min-h-screen min-w-screen bg-[url(./assets/bg1.jpg)] bg-fixed bg-cover bg-center py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Cloud className="text-blue-600" size={32} />
              <h1 className="text-3xl font-bold text-white">Weather Lens</h1>
            </div>
            <SearchBar />
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <ErrorDisplay />
            <WeatherDisplay />
          </div>
        </div>
        <Toaster position="top-right" />
      </div>
    </WeatherProvider>
  );
}

export default App;