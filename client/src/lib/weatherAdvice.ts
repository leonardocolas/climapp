import { WeatherData } from '@/hooks/useWeather';

export interface WeatherAdvice {
  title: string;
  message: string;
  gear: string[];
  activity: string;
  badge: {
    text: string;
    variant: 'rain' | 'sun' | 'pleasant' | 'wind' | 'cold';
  };
}

export function getWeatherAdvice(data: WeatherData): WeatherAdvice {
  const { current, location } = data;
  const temp = current.temperature;
  const precipitation = current.precipitation;
  const wind = current.windSpeed;
  const code = current.weatherCode;
  const cityName = location.name.split(',')[0];

  // Lluvia o tormenta (códigos WMO de lluvia/nieve/tormenta o precipitación > 0.3)
  const isRainy = (code >= 51 && code <= 99) || precipitation > 0.3;
  
  if (isRainy) {
    return {
      title: `Lluvia en ${cityName}: Prepara el paraguas`,
      message: `Se registran precipitaciones de ${precipitation.toFixed(1)} mm y el ambiente está húmedo. Te sugerimos salir bien protegido para evitar sorpresas en la calle.`,
      gear: ['Paraguas resistente', 'Capa o impermeable', 'Calzado cerrado e impermeable'],
      activity: 'Excelente momento para visitar un museo, leer en una cafetería acogedora o disfrutar de una película en casa.',
      badge: { text: 'Día lluvioso', variant: 'rain' },
    };
  }

  // Calor intenso / Mucho sol (temperatura >= 28 y sin lluvia)
  if (temp >= 28) {
    return {
      title: `Calor y sol radiante en ${cityName}`,
      message: `El termómetro marca ${temp}° con cielos despejados. El sol pega con fuerza, por lo que la hidratación constante y la protección son fundamentales si vas a estar al aire libre.`,
      gear: ['Protector solar FPS 50+', 'Gafas de sol y gorra', 'Botella de agua fría'],
      activity: temp >= 32 ? 'Ideal para refrescarse en la piscina, buscar sombra en parques arbolados o visitar la costa.' : 'Perfecto para un paseo matutino, disfrutar de una terraza al aire libre o un plan de playa.',
      badge: { text: 'Sol e intensidad', variant: 'sun' },
    };
  }

  // Clima agradable / Templado (18° a 27°)
  if (temp >= 18 && temp < 28) {
    return {
      title: `Clima inmejorable en ${cityName}`,
      message: `Con una temperatura perfecta de ${temp}° y condiciones estables, el ambiente invita a disfrutar plenamente de la calle sin preocupaciones térmicas.`,
      gear: ['Ropa ligera y cómoda', 'Gafas de sol opcionales', 'Una chaqueta ligera por si refresca tarde'],
      activity: 'Ideal para caminatas largas, pasear por el centro histórico, hacer ejercicio al aire libre o comer en una terraza.',
      badge: { text: 'Clima agradable', variant: 'pleasant' },
    };
  }

  // Viento fuerte
  if (wind >= 25) {
    return {
      title: `Viento notable en ${cityName}`,
      message: `El viento sopla a ${wind} km/h, lo que puede hacer que la sensación térmica sea más baja de lo que indica el termómetro. Conviene abrigarse el pecho y cuidar objetos ligeros.`,
      gear: ['Cortavientos o chaqueta resistente', 'Bufanda ligera', 'Cabello recogido si es necesario'],
      activity: 'Buen día para actividades bajo techo, visitar galerías o dar un paseo en zonas resguardadas del viento.',
      badge: { text: 'Viento fuerte', variant: 'wind' },
    };
  }

  // Clima frío (< 18°)
  return {
    title: `Ambiente fresco en ${cityName}`,
    message: `El termómetro marca unos frescos ${temp}°. El aire pide un atuendo abrigado para caminar con total comodidad y mantener el calor corporal.`,
    gear: ['Chaqueta o abrigo abrigado', 'Bufanda y suéter de lana', 'Bebida caliente en mano'],
    activity: 'Ideal para paseos dinámicos que mantengan la temperatura, entrar a librerías o disfrutar de un café caliente.',
    badge: { text: 'Ambiente fresco', variant: 'cold' },
  };
}
