import { useState } from 'react';
import { ArrowRight, Globe2, MapPin, Radio, Sparkles } from 'lucide-react';
import { CitySearch } from '@/components/CitySearch';
import { CurrentWeather } from '@/components/CurrentWeather';
import { ForecastCards } from '@/components/ForecastCards';
import { WeatherAdviceCard } from '@/components/WeatherAdviceCard';
import { useWeather } from '@/hooks/useWeather';

const popularCities = ['Madrid', 'Nueva York', 'Tokio', 'Ciudad de México', 'París', 'Sídney'];
const quickLocations = [
  { name: 'Madrid', icon: '☀️' },
  { name: 'Nueva York', icon: '⛅' },
  { name: 'Tokio', icon: '🌧️' },
  { name: 'París', icon: '🌤️' },
  { name: 'Sídney', icon: '☀️' },
  { name: 'Toronto', icon: '❄️' },
];

export default function Home() {
  const [searchCity, setSearchCity] = useState('');
  const { data, loading, error } = useWeather(searchCity);

  const handleCitySelect = (city: string) => {
    setSearchCity(city);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#07111f] text-[#edf6ff]">
      {/* Global atmospheric background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-32 -top-40 h-[34rem] w-[34rem] rounded-full bg-cyan-400/10 blur-[110px] drift" />
        <div className="absolute -right-40 top-[24rem] h-[30rem] w-[30rem] rounded-full bg-indigo-500/10 blur-[120px] float-slow" />
        <div className="weather-grid absolute inset-x-0 top-0 h-[72rem] opacity-70" />
      </div>

      {/* Header */}
      <header className="relative z-40 border-b border-white/10 bg-[#07111f]/75 backdrop-blur-xl">
        <div className="container flex min-h-[76px] items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-lg shadow-cyan-950/30">
              <img src="/manus-storage/clima-logo_dfded397.png" alt="" className="h-8 w-8 object-contain" />
            </div>
            <div>
              <p className="font-display text-[1.15rem] font-bold tracking-tight text-white">ClimaYa</p>
              <p className="hidden text-[0.68rem] uppercase tracking-[0.18em] text-slate-400 sm:block">Lectura global del tiempo</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400 sm:gap-5">
            <div className="hidden items-center gap-2 md:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.9)]" />
              Datos actualizados
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
              <Globe2 className="h-3.5 w-3.5 text-cyan-300" />
              Global
            </div>
          </div>
        </div>
      </header>

      <main className="container relative py-8 sm:py-12 lg:py-16">
        {/* Hero */}
        <section className="hero-noise relative mb-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c1a2b] shadow-[0_30px_100px_rgba(0,0,0,0.28)] sm:mb-16">
          <img
            src="/manus-storage/clima-hero-bg_3e829064.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.18] mix-blend-screen drift"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(94,231,245,0.24),transparent_32%),linear-gradient(120deg,rgba(7,17,31,0.98),rgba(10,28,48,0.84)_58%,rgba(35,25,64,0.78))]" />
          <div className="relative grid gap-10 px-6 py-8 sm:px-10 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-14 lg:py-16">
            <div className="reveal-up max-w-2xl">
              <div className="eyebrow mb-5 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Tu ventana al cielo
              </div>
              <h1 className="text-balance max-w-xl text-4xl font-semibold leading-[0.98] tracking-[-0.06em] text-white sm:text-6xl lg:text-[5.35rem]">
                El clima, <span className="text-cyan-300">en movimiento.</span>
              </h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-slate-300 sm:text-lg">
                Consulta el pulso de cualquier ciudad del mundo y prepárate para lo que viene con una lectura clara, rápida y visual.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-medium text-slate-400">
                <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-2">
                  <Radio className="h-3.5 w-3.5 text-cyan-300" />
                  Actualizado al instante
                </span>
                <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-2">
                  <Globe2 className="h-3.5 w-3.5 text-[#ff9b71]" />
                  Cobertura global
                </span>
              </div>
            </div>

            <div className="reveal-up stagger-2 flex flex-col justify-end">
              <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                  <p className="eyebrow mb-2">Explora una ubicación</p>
                  <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">¿Qué cielo quieres leer?</h2>
                </div>
                <MapPin className="mb-1 hidden h-7 w-7 text-cyan-300 sm:block" />
              </div>
              <div className="rounded-2xl border border-white/15 bg-[#081525]/75 p-2 shadow-2xl shadow-cyan-950/25 backdrop-blur-xl">
                <CitySearch onCitySelect={handleCitySelect} value={searchCity} />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {popularCities.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => handleCitySelect(city)}
                    className="group flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-slate-300 hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-cyan-100"
                  >
                    {city}
                    <ArrowRight className="h-3 w-3 opacity-50 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-3 gap-2 border-t border-white/10 pt-5">
                <div className="rounded-xl bg-white/[0.04] p-3"><span className="text-lg">☀️</span><p className="mt-2 text-[0.66rem] uppercase tracking-[0.12em] text-slate-400">Despejado</p></div>
                <div className="rounded-xl bg-white/[0.04] p-3"><span className="text-lg">⛅</span><p className="mt-2 text-[0.66rem] uppercase tracking-[0.12em] text-slate-400">Variable</p></div>
                <div className="rounded-xl bg-white/[0.04] p-3"><span className="text-lg">🌧️</span><p className="mt-2 text-[0.66rem] uppercase tracking-[0.12em] text-slate-400">Lluvia</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* Loading */}
        {loading && (
          <div className="glass-panel reveal-up flex min-h-64 flex-col items-center justify-center rounded-3xl gap-5 p-10 text-center">
            <div className="pulse-ring grid h-16 w-16 place-items-center rounded-full border border-cyan-300/30 bg-cyan-300/10">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-200/20 border-t-cyan-200" />
            </div>
            <div>
              <p className="text-lg font-semibold text-white">Leyendo la atmósfera…</p>
              <p className="mt-1 text-sm text-slate-400">Estamos preparando el pronóstico de {searchCity || 'tu ciudad'}.</p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="reveal-up rounded-3xl border border-rose-300/20 bg-rose-400/[0.08] p-6 shadow-2xl shadow-rose-950/20 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-rose-300/10 text-rose-200">!</div>
              <div>
                <p className="text-lg font-semibold text-rose-100">No pudimos ubicar esa ciudad</p>
                <p className="mt-1 text-sm leading-6 text-rose-200/70">{error}. Prueba con otro nombre o selecciona una sugerencia de búsqueda.</p>
              </div>
            </div>
          </div>
        )}

        {/* Weather */}
        {data && !loading && (
          <div className="space-y-14 sm:space-y-20">
            <section className="reveal-up" aria-label="Clima actual">
              <CurrentWeather data={data} />
            </section>
            <section className="reveal-up stagger-1" aria-label="Sugerencia personalizada">
              <WeatherAdviceCard data={data} />
            </section>
            <section className="reveal-up stagger-2" aria-label="Pronóstico extendido">
              <ForecastCards data={data} />
            </section>
          </div>
        )}

        {/* Empty state */}
        {!data && !loading && !error && (
          <section className="reveal-up stagger-2 grid items-center gap-10 rounded-3xl border border-white/10 bg-white/[0.035] p-7 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:p-14">
            <div>
              <p className="eyebrow mb-4">Empieza por una ciudad</p>
              <h2 className="max-w-md text-3xl font-semibold leading-tight text-white sm:text-4xl">Un mapa mental del cielo, a tu alcance.</h2>
              <p className="mt-4 max-w-md leading-7 text-slate-400">Busca una ubicación y convierte datos meteorológicos en una decisión sencilla: qué llevar, cuándo salir y cómo prepararte.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {quickLocations.map((city, index) => (
                <button
                  key={city.name}
                  type="button"
                  onClick={() => handleCitySelect(city.name)}
                  className={`glass-soft group rounded-2xl p-4 text-left hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-cyan-300/[0.08] ${index > 2 ? 'hidden sm:block' : ''}`}
                >
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <MapPin className="h-4 w-4 text-cyan-300" />
                    <span className="text-2xl transition-transform group-hover:scale-110" aria-hidden="true">{city.icon}</span>
                  </div>
                  <span className="block text-sm font-semibold text-white">{city.name}</span>
                  <span className="mt-1 flex items-center gap-1 text-xs text-slate-500 group-hover:text-cyan-200/70">Abrir lectura <ArrowRight className="h-3 w-3" /></span>
                </button>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-white/10 bg-[#050d18]/80">
        <div className="container flex flex-col gap-3 py-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>ClimaYa — una lectura más humana del clima.</p>
          <p>Datos meteorológicos proporcionados por Open-Meteo API</p>
        </div>
      </footer>
    </div>
  );
}

/* Design reminder: this page is an editorial, atmospheric control room. Prioritize dark ink, cyan signal color, asymmetry, layered surfaces, and calm motion. */
