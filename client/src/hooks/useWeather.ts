import { useState, useEffect } from 'react';

export interface WeatherData {
  location: {
    name: string;
    latitude: number;
    longitude: number;
    timezone: string;
  };
  current: {
    temperature: number;
    weatherCode: number;
    windSpeed: number;
    humidity: number;
    apparentTemperature: number;
    precipitation: number;
    weatherDescription: string;
    weatherIcon: string;
  };
  forecast: Array<{
    date: string;
    maxTemp: number;
    minTemp: number;
    weatherCode: number;
    weatherDescription: string;
    weatherIcon: string;
    precipitation: number;
    windSpeed: number;
  }>;
}

interface GeocodingResult {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

// Weather code to description mapping (WMO codes)
const weatherCodeDescriptions: Record<number, { description: string; icon: string }> = {
  0: { description: 'Despejado', icon: '☀️' },
  1: { description: 'Principalmente despejado', icon: '🌤️' },
  2: { description: 'Parcialmente nublado', icon: '⛅' },
  3: { description: 'Nublado', icon: '☁️' },
  45: { description: 'Niebla', icon: '🌫️' },
  48: { description: 'Niebla con escarcha', icon: '🌫️' },
  51: { description: 'Llovizna ligera', icon: '🌧️' },
  53: { description: 'Llovizna moderada', icon: '🌧️' },
  55: { description: 'Llovizna densa', icon: '🌧️' },
  61: { description: 'Lluvia ligera', icon: '🌧️' },
  63: { description: 'Lluvia moderada', icon: '🌧️' },
  65: { description: 'Lluvia fuerte', icon: '⛈️' },
  71: { description: 'Nieve ligera', icon: '❄️' },
  73: { description: 'Nieve moderada', icon: '❄️' },
  75: { description: 'Nieve fuerte', icon: '❄️' },
  77: { description: 'Granos de nieve', icon: '❄️' },
  80: { description: 'Lluvia ligera', icon: '🌧️' },
  81: { description: 'Lluvia moderada', icon: '🌧️' },
  82: { description: 'Lluvia fuerte', icon: '⛈️' },
  85: { description: 'Nieve ligera', icon: '❄️' },
  86: { description: 'Nieve fuerte', icon: '❄️' },
  95: { description: 'Tormenta', icon: '⛈️' },
  96: { description: 'Tormenta con granizo', icon: '⛈️' },
  99: { description: 'Tormenta con granizo fuerte', icon: '⛈️' },
};

export const useWeather = (city: string) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city.trim()) {
      setData(null);
      setError(null);
      return;
    }

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        // Step 1: Geocode the city name
        const geoResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=es&format=json`
        );

        if (!geoResponse.ok) {
          throw new Error('Error al buscar la ciudad');
        }

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
          throw new Error('Ciudad no encontrada');
        }

        const location = geoData.results[0] as GeocodingResult;

        // Step 2: Fetch weather data
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max&timezone=auto&forecast_days=8`
        );

        if (!weatherResponse.ok) {
          throw new Error('Error al obtener datos del clima');
        }

        const weatherData = await weatherResponse.json();

        // Process the data
        const current = weatherData.current;
        const weatherCode = current.weather_code;
        const weatherInfo = weatherCodeDescriptions[weatherCode] || {
          description: 'Desconocido',
          icon: '🌐',
        };

        const forecast = weatherData.daily.time.map((date: string, index: number) => {
          const code = weatherData.daily.weather_code[index];
          const info = weatherCodeDescriptions[code] || {
            description: 'Desconocido',
            icon: '🌐',
          };

          return {
            date,
            maxTemp: Math.round(weatherData.daily.temperature_2m_max[index]),
            minTemp: Math.round(weatherData.daily.temperature_2m_min[index]),
            weatherCode: code,
            weatherDescription: info.description,
            weatherIcon: info.icon,
            precipitation: weatherData.daily.precipitation_sum[index],
            windSpeed: Math.round(weatherData.daily.wind_speed_10m_max[index]),
          };
        });

        setData({
          location: {
            name: `${location.name}${location.admin1 ? ', ' + location.admin1 : ''}, ${location.country}`,
            latitude: location.latitude,
            longitude: location.longitude,
            timezone: weatherData.timezone,
          },
          current: {
            temperature: Math.round(current.temperature_2m),
            weatherCode,
            windSpeed: Math.round(current.wind_speed_10m),
            humidity: current.relative_humidity_2m,
            apparentTemperature: Math.round(current.apparent_temperature),
            precipitation: current.precipitation,
            weatherDescription: weatherInfo.description,
            weatherIcon: weatherInfo.icon,
          },
          forecast,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { data, loading, error };
};
