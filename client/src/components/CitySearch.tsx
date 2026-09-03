import { useState, useEffect, useRef } from 'react';
import { Search, X, LoaderCircle, MapPin } from 'lucide-react';

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
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInput(value);
  }, [value]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchSuggestions = async () => {
      if (input.trim().length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(input)}&count=8&language=es&format=json`,
          { signal: controller.signal }
        );
        const data = await response.json();

        if (data.results) {
          setSuggestions(
            data.results.map((result: CityOption) => ({
              name: result.name,
              country: result.country,
              admin1: result.admin1,
              latitude: result.latitude,
              longitude: result.longitude,
            }))
          );
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
          setShowSuggestions(true);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
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
    onCitySelect('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full">
      <div className="group relative flex items-center">
        <Search className="pointer-events-none absolute left-4 h-5 w-5 text-cyan-300/70 transition-colors group-focus-within:text-cyan-200" />
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onFocus={() => input.trim().length >= 2 && setShowSuggestions(true)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setShowSuggestions(false);
            if (event.key === 'ArrowDown' && suggestions.length) {
              event.preventDefault();
              setActiveIndex((index) => (index + 1) % suggestions.length);
            }
            if (event.key === 'ArrowUp' && suggestions.length) {
              event.preventDefault();
              setActiveIndex((index) => (index - 1 + suggestions.length) % suggestions.length);
            }
            if (event.key === 'Enter' && activeIndex >= 0 && suggestions[activeIndex]) {
              event.preventDefault();
              handleSelectCity(suggestions[activeIndex]);
            }
          }}
          placeholder="Busca cualquier ciudad del mundo…"
          aria-label="Buscar ciudad"
          className="h-14 w-full rounded-xl border border-white/10 bg-white/[0.07] pl-12 pr-12 text-[0.95rem] text-white placeholder:text-slate-500 focus:border-cyan-300/50 focus:bg-white/[0.1] focus:outline-none focus:ring-4 focus:ring-cyan-300/10"
        />
        {loading && <LoaderCircle className="absolute right-4 h-5 w-5 animate-spin text-cyan-200" />}
        {!loading && input && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
            aria-label="Limpiar búsqueda"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {showSuggestions && (
        <div ref={suggestionsRef} className="glass-panel absolute left-0 right-0 top-full z-50 mt-3 overflow-hidden rounded-2xl p-2">
          {suggestions.length > 0 ? (
            <ul className="max-h-80 overflow-y-auto scrollbar-hidden">
              {suggestions.map((city, index) => (
                <li key={`${city.name}-${city.country}-${index}`}>
                  <button
                    type="button"
                    onClick={() => handleSelectCity(city)}
                    className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-cyan-300/[0.08] ${activeIndex === index ? 'bg-cyan-300/[0.08]' : ''}`}
                    aria-selected={activeIndex === index}
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-cyan-200 group-hover:border-cyan-300/30">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-white">{city.name}</span>
                      <span className="block truncate text-xs text-slate-500">{city.admin1 ? `${city.admin1}, ` : ''}{city.country}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : !loading ? (
            <p className="px-4 py-5 text-center text-sm text-slate-400">No encontramos esa ubicación.</p>
          ) : null}
        </div>
      )}
    </div>
  );
}

/* Design reminder: search is the primary action. Keep it tactile, high-contrast, calm, and visually connected to the atmospheric hero. */
