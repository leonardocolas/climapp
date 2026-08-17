import { Sparkles, Umbrella, Sun, Compass, Wind, ThermometerSnowflake, CheckCircle2 } from 'lucide-react';
import { WeatherData } from '@/hooks/useWeather';
import { getWeatherAdvice } from '@/lib/weatherAdvice';

interface WeatherAdviceCardProps {
  data: WeatherData;
}

export function WeatherAdviceCard({ data }: WeatherAdviceCardProps) {
  const advice = getWeatherAdvice(data);

  const getBadgeStyle = (variant: string) => {
    switch (variant) {
      case 'rain':
        return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      case 'sun':
        return 'bg-amber-500/20 text-amber-300 border-amber-400/30';
      case 'pleasant':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30';
      case 'wind':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30';
      default:
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30';
    }
  };

  const getIcon = (variant: string) => {
    switch (variant) {
      case 'rain':
        return <Umbrella className="h-5 w-5 text-blue-300" />;
      case 'sun':
        return <Sun className="h-5 w-5 text-amber-300" />;
      case 'pleasant':
        return <Sparkles className="h-5 w-5 text-emerald-300" />;
      case 'wind':
        return <Wind className="h-5 w-5 text-cyan-300" />;
      default:
        return <ThermometerSnowflake className="h-5 w-5 text-indigo-300" />;
    }
  };

  return (
    <div className="glass-panel relative overflow-hidden rounded-3xl p-6 sm:p-8">
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" aria-hidden="true" />
      <div className="relative z-10">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/[0.08] border border-white/10 shadow-lg">
              {getIcon(advice.badge.variant)}
            </div>
            <div>
              <span className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${getBadgeStyle(advice.badge.variant)}`}>
                {advice.badge.text}
              </span>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{advice.title}</h3>
            </div>
          </div>
        </div>

        <p className="mt-4 text-base leading-7 text-slate-300">{advice.message}</p>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="eyebrow mb-3 flex items-center gap-2 text-cyan-300">
              <CheckCircle2 className="h-4 w-4" /> Qué llevar contigo
            </p>
            <ul className="space-y-2.5">
              {advice.gear.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-sm text-slate-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="eyebrow mb-3 flex items-center gap-2 text-[#ff9b71]">
              <Compass className="h-4 w-4" /> Plan sugerido
            </p>
            <p className="text-sm leading-6 text-slate-200">{advice.activity}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
