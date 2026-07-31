import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface CitySearchProps {
  onCitySelect: (city: string) => void;
  value: string;
}

interface CityOption {
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
}

export function CitySearch({ onCitySelect, value }: CitySearchProps) {
  const [input, setInput] = useState(value);
  const [suggestions, setSuggestions] = useState<CityOption[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (input.trim().length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(input)}&count=10&language=es&format=json`
        );
        const data = await response.json();

        if (data.results) {
          setSuggestions(
            data.results.map((result: any) => ({
              name: result.name,
              country: result.country,
              admin1: result.admin1,
              latitude: result.latitude,
              longitude: result.longitude,
            }))
          );
          setShowSuggestions(true);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [input]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectCity = (city: CityOption) => {
    const fullName = `${city.name}${city.admin1 ? ', ' + city.admin1 : ''}, ${city.country}`;
    setInput(fullName);
    onCitySelect(fullName);
    setShowSuggestions(false);
  };

  const handleClear = () => {
    setInput('');
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => input.trim().length >= 2 && setShowSuggestions(true)}
          placeholder="Busca cualquier ciudad del mundo..."
          className="w-full pl-12 pr-12 py-3 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
        {input && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-md transition-colors"
            aria-label="Limpiar búsqueda"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-elevation-lg z-50 overflow-hidden"
        >
          <ul className="max-h-80 overflow-y-auto">
            {suggestions.map((city, index) => (
              <li key={`${city.name}-${city.country}-${index}`}>
                <button
                  onClick={() => handleSelectCity(city)}
                  className="w-full px-4 py-3 text-left hover:bg-secondary transition-colors flex flex-col"
                >
                  <span className="font-medium text-foreground">
                    {city.name}
                    {city.admin1 && <span className="text-muted-foreground">, {city.admin1}</span>}
                  </span>
                  <span className="text-sm text-muted-foreground">{city.country}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {loading && input.trim().length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-elevation-lg z-50 p-4">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
            <span className="text-sm text-muted-foreground">Buscando ciudades...</span>
          </div>
        </div>
      )}

      {showSuggestions && suggestions.length === 0 && input.trim().length >= 2 && !loading && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-elevation-lg z-50 p-4">
          <p className="text-sm text-muted-foreground text-center">No se encontraron ciudades</p>
        </div>
      )}
    </div>
  );
}
