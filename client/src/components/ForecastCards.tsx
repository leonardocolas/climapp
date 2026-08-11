import { WeatherData } from '@/hooks/useWeather';
import { ArrowUpRight, Droplets, Wind } from 'lucide-react';

interface ForecastCardsProps {
  data: WeatherData;
}

const formatDate = (dateString: string): { weekday: string; date: string } => {
  const date = new Date(dateString + 'T00:00:00');
  return {
    weekday: date.toLocaleDateString('es-ES', { weekday: 'short' }).replace('.', ''),
    date: date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }).replace('.', ''),
  };
};

const getTone = (weatherCode: number) => {
  if (weatherCode === 0 || weatherCode === 1) return { accent: '#ffb35f', bar: 'from-[#ffb35f] to-[#ff7b62]' };
  if (weatherCode === 2 || weatherCode === 3) return { accent: '#8cb7d8', bar: 'from-[#8cb7d8] to-[#6c82ff]' };
  if (weatherCode >= 51) return { accent: '#5ee7f5', bar: 'from-[#5ee7f5] to-[#8b8cff]' };
  return { accent: '#8b8cff', bar: 'from-[#8b8cff] to-[#5ee7f5]' };
};

export function ForecastCards({ data }: ForecastCardsProps) {
  const forecast = data.forecast.slice(1, 8);
  const allTemps = forecast.flatMap((day) => [day.maxTemp, day.minTemp]);
  const minRange = Math.min(...allTemps);
  const maxRange = Math.max(...allTemps);

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow mb-2">Lo que viene</p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Pronóstico extendido</h2>
        </div>
        <p className="max-w-xs text-sm leading-6 text-slate-500 sm:text-right">Siete días para planear con una mirada. Temperaturas en grados Celsius.</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {forecast.map((day, index) => {
          const tone = getTone(day.weatherCode);
          const date = formatDate(day.date);
          const range = maxRange - minRange || 1;
          const start = ((day.minTemp - minRange) / range) * 100;
          const width = ((day.maxTemp - day.minTemp) / range) * 100;

          return (
            <article
              key={`${day.date}-${index}`}
              className={`reveal-up stagger-${Math.min(index + 1, 5)} group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.075] sm:p-5`}
            >
              <div className="absolute inset-x-0 top-0 h-px opacity-70" style={{ background: tone.accent }} />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold capitalize text-white">{date.weekday}</p>
                  <p className="mt-1 text-xs capitalize text-slate-500">{date.date}</p>
                </div>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/[0.06] text-slate-400 transition-colors group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>

              <div className="mt-7 text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3" aria-hidden="true">{day.weatherIcon}</div>
              <p className="mt-4 min-h-10 text-xs font-medium leading-5 text-slate-300">{day.weatherDescription}</p>

              <div className="mt-5 flex items-end justify-between gap-2">
                <span className="text-2xl font-semibold text-white">{day.maxTemp}°</span>
                <span className="text-sm font-medium text-slate-500">{day.minTemp}°</span>
              </div>
              <div className="relative mt-3 h-1.5 rounded-full bg-white/10">
                <div className={`absolute h-1.5 rounded-full bg-gradient-to-r ${tone.bar}`} style={{ left: `${Math.min(start, 78)}%`, width: `${Math.max(width, 18)}%` }} />
              </div>

              <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="flex items-center gap-2"><Droplets className="h-3.5 w-3.5" /> Lluvia</span>
                  <span className="font-medium text-slate-300">{day.precipitation.toFixed(1)} mm</span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span className="flex items-center gap-2"><Wind className="h-3.5 w-3.5" /> Viento</span>
                  <span className="font-medium text-slate-300">{day.windSpeed} km/h</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

/* Design reminder: forecast cards form a calm scanning rhythm—vary temperature accents by weather, keep metadata secondary, and let hover reveal depth. */
