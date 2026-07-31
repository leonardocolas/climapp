import { WeatherData } from '@/hooks/useWeather';
import { Cloud, Droplets, Wind } from 'lucide-react';

interface ForecastCardsProps {
  data: WeatherData;
}

export function ForecastCards({ data }: ForecastCardsProps) {
  const forecast = data.forecast.slice(1, 8); // Skip today, show next 7 days

  const getGradientClass = (weatherCode: number): string => {
    if (weatherCode === 0 || weatherCode === 1) {
      return 'from-yellow-400/20 to-blue-400/20 border-yellow-200/50';
    } else if (weatherCode === 2 || weatherCode === 3) {
      return 'from-blue-300/20 to-blue-400/20 border-blue-200/50';
    } else if (weatherCode >= 45 && weatherCode <= 48) {
      return 'from-gray-300/20 to-gray-400/20 border-gray-200/50';
    } else if (weatherCode >= 51 && weatherCode <= 82) {
      return 'from-blue-500/20 to-purple-500/20 border-blue-300/50';
    } else if (weatherCode >= 85 || weatherCode >= 71) {
      return 'from-blue-600/20 to-purple-600/20 border-blue-400/50';
    } else if (weatherCode >= 80 && weatherCode <= 82) {
      return 'from-blue-500/20 to-purple-500/20 border-blue-300/50';
    } else {
      return 'from-blue-400/20 to-purple-400/20 border-blue-300/50';
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('es-ES', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-foreground mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>Pronóstico de 7 días</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {forecast.map((day, index) => (
          <div
            key={`${day.date}-${index}`}
            className={`bg-gradient-to-br ${getGradientClass(day.weatherCode)} rounded-xl p-5 border shadow-elevation hover:shadow-elevation-lg transition-all duration-300 hover:scale-105 cursor-pointer`}
          >
            {/* Date */}
            <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {formatDate(day.date)}
            </h3>

            {/* Weather Icon */}
            <div className="text-5xl mb-4">{day.weatherIcon}</div>

            {/* Weather Description */}
            <p className="text-sm text-foreground font-medium mb-4">{day.weatherDescription}</p>

            {/* Temperature Range */}
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-primary">{day.maxTemp}°</span>
                <span className="text-lg text-muted-foreground">{day.minTemp}°</span>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2 pt-4 border-t border-border/50">
              {/* Precipitation */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Droplets className="w-4 h-4" />
                  <span>Lluvia</span>
                </div>
                <span className="font-medium text-foreground">{day.precipitation.toFixed(1)} mm</span>
              </div>

              {/* Wind Speed */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Wind className="w-4 h-4" />
                  <span>Viento</span>
                </div>
                <span className="font-medium text-foreground">{day.windSpeed} km/h</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
