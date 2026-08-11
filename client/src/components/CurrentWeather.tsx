import { Cloud, Droplets, Eye, Gauge, MapPin, Wind } from 'lucide-react';
import { WeatherData } from '@/hooks/useWeather';

interface CurrentWeatherProps {
  data: WeatherData;
}

const getWeatherBackground = (weatherCode: number) => {
  if (weatherCode === 0 || weatherCode === 1) return '/manus-storage/clima-sunny-bg_26382b89.png';
  if (weatherCode >= 51 && weatherCode <= 99) return '/manus-storage/clima-rainy-bg_00944f4f.png';
  return '/manus-storage/clima-sunset-bg_15de83f5.png';
};

export function CurrentWeather({ data }: CurrentWeatherProps) {
  const { current, location } = data;
  const today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow mb-3 flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> Ubicación actual</p>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-white sm:text-5xl">{location.name}</h2>
          <p className="mt-2 capitalize text-sm text-slate-400">{today}</p>
        </div>
        <div className="flex items-center gap-2 self-start rounded-full border border-emerald-300/15 bg-emerald-300/[0.07] px-3 py-2 text-xs font-medium text-emerald-200 sm:self-end">
          <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.8)]" />
          Condiciones en vivo
        </div>
      </div>

      <div className="glass-panel relative isolate overflow-hidden rounded-[2rem]">
        <img src={getWeatherBackground(current.weatherCode)} alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30 mix-blend-screen" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(110deg,rgba(8,22,37,0.98)_0%,rgba(8,22,37,0.76)_47%,rgba(8,22,37,0.3)_100%)]" />
        <div className="relative grid min-h-[22rem] items-center gap-10 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:p-14">
          <div>
            <p className="eyebrow mb-4">Ahora mismo</p>
            <div className="flex items-start gap-5">
              <div className="text-[5rem] leading-none sm:text-[7rem]" aria-hidden="true">{current.weatherIcon}</div>
              <div>
                <p className="text-[5.3rem] font-semibold leading-[0.82] tracking-[-0.1em] text-white sm:text-[8rem]">{current.temperature}°</p>
                <p className="mt-5 text-xl font-semibold text-white sm:text-2xl">{current.weatherDescription}</p>
                <p className="mt-2 text-sm text-slate-300">Sensación térmica de {current.apparentTemperature}°</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:w-[25rem] lg:grid-cols-2">
            <WeatherMetric icon={<Droplets />} label="Humedad" value={`${current.humidity}%`} />
            <WeatherMetric icon={<Wind />} label="Viento" value={`${current.windSpeed} km/h`} />
            <WeatherMetric icon={<Cloud />} label="Precipitación" value={`${current.precipitation.toFixed(1)} mm`} />
            <WeatherMetric icon={<Gauge />} label="Sensación" value={`${current.apparentTemperature}°`} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <DetailCard icon={<Wind />} label="Viento" value={`${current.windSpeed} km/h`} note="velocidad actual" />
        <DetailCard icon={<Droplets />} label="Humedad" value={`${current.humidity}%`} note="en el ambiente" />
        <DetailCard icon={<Cloud />} label="Lluvia" value={`${current.precipitation.toFixed(1)} mm`} note="registrada ahora" />
        <DetailCard icon={<Eye />} label="Visibilidad" value="Buena" note="condiciones abiertas" />
      </div>
    </div>
  );
}

function WeatherMetric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#07111f]/40 p-4 backdrop-blur-md">
      <div className="mb-5 flex items-center gap-2 text-cyan-200/80">
        <span className="[&>svg]:h-4 [&>svg]:w-4">{icon}</span>
        <span className="text-xs text-slate-400">{label}</span>
      </div>
      <p className="text-xl font-semibold text-white">{value}</p>
    </div>
  );
}

function DetailCard({ icon, label, value, note }: { icon: React.ReactNode; label: string; value: string; note: string }) {
  return (
    <div className="glass-soft rounded-2xl p-4 transition-transform hover:-translate-y-1 hover:border-cyan-300/25 sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-300/10 text-cyan-200 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>
        <span className="text-[0.65rem] uppercase tracking-[0.14em] text-slate-500">Live</span>
      </div>
      <p className="mt-5 text-xs text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{note}</p>
    </div>
  );
}

/* Design reminder: current weather is the command-center moment—make temperature dominant, metrics compact, and atmospheric imagery supportive rather than noisy. */
