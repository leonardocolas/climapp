import { Cloud, Droplets, Wind, Eye } from 'lucide-react';
import { WeatherData } from '@/hooks/useWeather';

interface CurrentWeatherProps {
  data: WeatherData;
}

export function CurrentWeather({ data }: CurrentWeatherProps) {
  const { current, location } = data;

  return (
    <div className="w-full">
      {/* Location Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
          {location.name}
        </h1>
        <p className="text-lg text-muted-foreground">
          {new Date().toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Main Weather Card */}
      <div className="bg-gradient-to-br from-primary/10 to-accent/5 rounded-2xl p-8 md:p-12 border border-border shadow-elevation-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Temperature Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="text-7xl md:text-8xl font-bold text-primary mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {current.temperature}°
            </div>
            <p className="text-2xl md:text-3xl text-foreground font-medium mb-2">
              {current.weatherDescription}
            </p>
            <p className="text-lg text-muted-foreground">
              Sensación térmica: {current.apparentTemperature}°
            </p>
          </div>

          {/* Weather Icon */}
          <div className="flex justify-center md:justify-end">
            <div className="text-9xl animate-bounce" style={{ animationDuration: '2s' }}>
              {current.weatherIcon}
            </div>
          </div>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Humidity */}
        <div className="bg-card rounded-xl p-4 border border-border shadow-elevation">
          <div className="flex items-center gap-3 mb-2">
            <Droplets className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Humedad</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{current.humidity}%</p>
        </div>

        {/* Wind Speed */}
        <div className="bg-card rounded-xl p-4 border border-border shadow-elevation">
          <div className="flex items-center gap-3 mb-2">
            <Wind className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Viento</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{current.windSpeed} km/h</p>
        </div>

        {/* Precipitation */}
        <div className="bg-card rounded-xl p-4 border border-border shadow-elevation">
          <div className="flex items-center gap-3 mb-2">
            <Cloud className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Lluvia</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{current.precipitation.toFixed(1)} mm</p>
        </div>

        {/* Visibility - using a placeholder */}
        <div className="bg-card rounded-xl p-4 border border-border shadow-elevation">
          <div className="flex items-center gap-3 mb-2">
            <Eye className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Visibilidad</span>
          </div>
          <p className="text-2xl font-bold text-foreground">Buena</p>
        </div>
      </div>
    </div>
  );
}
