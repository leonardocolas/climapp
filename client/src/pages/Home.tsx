import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { CitySearch } from '@/components/CitySearch';
import { CurrentWeather } from '@/components/CurrentWeather';
import { ForecastCards } from '@/components/ForecastCards';
import { useWeather } from '@/hooks/useWeather';

export default function Home() {
  const [searchCity, setSearchCity] = useState('');
  const { data, loading, error } = useWeather(searchCity);

  const handleCitySelect = (city: string) => {
    setSearchCity(city);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container py-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">🌍</div>
            <h1 className="text-2xl font-bold text-primary" style={{ fontFamily: "'Poppins', sans-serif" }}>ClimaYa</h1>
          </div>
          <p className="text-sm text-muted-foreground">Tu pronóstico del tiempo moderno</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8 md:py-12">
        {/* Search Section */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto">
            <CitySearch onCitySelect={handleCitySelect} value={searchCity} />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="text-lg text-muted-foreground">Cargando datos del clima...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="max-w-2xl mx-auto bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <p className="text-red-700 dark:text-red-300 font-medium">Error al cargar el clima</p>
            <p className="text-red-600 dark:text-red-400 text-sm mt-1">{error}</p>
            <p className="text-red-600 dark:text-red-400 text-sm mt-3">
              Por favor, verifica el nombre de la ciudad e intenta de nuevo.
            </p>
          </div>
        )}

        {/* Weather Data */}
        {data && !loading && (
          <div className="space-y-12">
            {/* Current Weather */}
            <section>
              <CurrentWeather data={data} />
            </section>

            {/* Forecast */}
            <section>
              <ForecastCards data={data} />
            </section>
          </div>
        )}

        {/* Empty State */}
        {!data && !loading && !error && (
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Busca una ciudad
            </h2>
            <p className="text-muted-foreground mb-6">
              Ingresa el nombre de cualquier ciudad del mundo para ver el pronóstico del tiempo actual
              y de los próximos 7 días.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              {['Madrid', 'Nueva York', 'Tokio', 'París', 'Sídney', 'Toronto', 'Estambul', 'Dubái'].map(
                (city) => (
                  <button
                    key={city}
                    onClick={() => handleCitySelect(city)}
                    className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-medium transition-colors"
                  >
                    {city}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-12">
        <div className="container py-8 text-center text-sm text-muted-foreground">
          <p>Datos de clima proporcionados por Open-Meteo API</p>
          <p className="mt-2">© 2026 ClimaYa - Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
}
