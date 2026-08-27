'use client';

import { useEffect, useState } from 'react';

const DEFAULT_LOCATION = { name: 'Luxembourg', latitude: 49.6116, longitude: 6.1319 };

// WMO weather codes -> [label, icon family]. https://open-meteo.com/en/docs
const CODE_MAP = {
  0: ['Clear sky', 'sun'],
  1: ['Mostly clear', 'sun'],
  2: ['Partly sunny', 'partly'],
  3: ['Overcast', 'cloud'],
  45: ['Foggy', 'fog'],
  48: ['Foggy', 'fog'],
  51: ['Light drizzle', 'rain'],
  53: ['Drizzle', 'rain'],
  55: ['Heavy drizzle', 'rain'],
  56: ['Freezing drizzle', 'rain'],
  57: ['Freezing drizzle', 'rain'],
  61: ['Light rain', 'rain'],
  63: ['Rain', 'rain'],
  65: ['Heavy rain', 'rain'],
  66: ['Freezing rain', 'rain'],
  67: ['Freezing rain', 'rain'],
  71: ['Light snow', 'snow'],
  73: ['Snow', 'snow'],
  75: ['Heavy snow', 'snow'],
  77: ['Snow grains', 'snow'],
  80: ['Rain showers', 'rain'],
  81: ['Rain showers', 'rain'],
  82: ['Heavy showers', 'rain'],
  85: ['Snow showers', 'snow'],
  86: ['Snow showers', 'snow'],
  95: ['Thunderstorm', 'storm'],
  96: ['Thunderstorm', 'storm'],
  99: ['Severe storm', 'storm']
};

function describeWeatherCode(code) {
  return CODE_MAP[code] ?? ['Overcast', 'cloud'];
}

function PinIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 21.5s6.75-6.42 6.75-11.4A6.75 6.75 0 0 0 5.25 10.1c0 4.98 6.75 11.4 6.75 11.4z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function WeatherIcon({ type, className = '' }) {
  const common = { className, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' };
  switch (type) {
    case 'sun':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4.4" stroke="currentColor" strokeWidth="1.6" />
          <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M12 2.6v2.2M12 19.2v2.2M4.3 4.3l1.6 1.6M18.1 18.1l1.6 1.6M2.6 12h2.2M19.2 12h2.2M4.3 19.7l1.6-1.6M18.1 5.9l1.6-1.6" />
          </g>
        </svg>
      );
    case 'partly':
      return (
        <svg {...common}>
          <circle cx="8.8" cy="8.4" r="3.3" stroke="currentColor" strokeWidth="1.5" />
          <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
            <path d="M8.8 3.4v1.4M3.8 8.4h1.4M13.5 4.1l-1 1M4.4 12.5l1-1" />
          </g>
          <path
            d="M9 16.6a4.5 4.5 0 0 1 4.3-3.3 4.8 4.8 0 0 1 4.7 3.8 3.3 3.3 0 0 1-.6 6.5H9.4A3.5 3.5 0 0 1 9 16.6z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'rain':
      return (
        <svg {...common}>
          <path
            d="M7.5 14.6a4.1 4.1 0 0 1-.5-8.2A5.3 5.3 0 0 1 17.4 5.2a3.7 3.7 0 0 1-.9 9.4H7.5z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M9 18.3l-1 2.2M13 18.3l-1 2.2M17 18.3l-1 2.2" />
          </g>
        </svg>
      );
    case 'snow':
      return (
        <svg {...common}>
          <path
            d="M7.5 14.6a4.1 4.1 0 0 1-.5-8.2A5.3 5.3 0 0 1 17.4 5.2a3.7 3.7 0 0 1-.9 9.4H7.5z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M9 18v3M7.6 19.5h2.8M14.5 18v3M13.1 19.5h2.8" />
          </g>
        </svg>
      );
    case 'storm':
      return (
        <svg {...common}>
          <path
            d="M7.5 13.6a4.1 4.1 0 0 1-.5-8.2A5.3 5.3 0 0 1 17.4 4.2a3.7 3.7 0 0 1-.9 9.4H7.5z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M13 15.3l-2.5 3.5h2.3L10.8 22.5l4.1-4.7h-2.2l1.8-2.1z"
            fill="currentColor"
          />
        </svg>
      );
    case 'fog':
      return (
        <svg {...common}>
          <path
            d="M7.5 11.6a4.1 4.1 0 0 1-.5-8.2A5.3 5.3 0 0 1 17.4 2.2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M4 13.6h16M4 17.1h16M4 20.6h12" />
          </g>
        </svg>
      );
    case 'cloud':
    default:
      return (
        <svg {...common}>
          <path
            d="M7.5 18.4a4.1 4.1 0 0 1-.5-8.2A5.3 5.3 0 0 1 17.4 8.9a3.7 3.7 0 0 1-.9 9.5H7.5z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

export default function WeatherWidget() {
  const [state, setState] = useState({ status: 'loading', location: DEFAULT_LOCATION, data: null, isDefault: true });

  useEffect(() => {
    let cancelled = false;

    async function resolveLocationName(latitude, longitude) {
      try {
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );
        const json = await res.json();
        return json.city || json.locality || json.principalSubdivision || DEFAULT_LOCATION.name;
      } catch {
        return DEFAULT_LOCATION.name;
      }
    }

    async function loadWeather(latitude, longitude, name, isDefault) {
      try {
        const url =
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
          `&current=temperature_2m,weather_code,wind_speed_10m` +
          `&daily=temperature_2m_max,weather_code&timezone=auto&forecast_days=4`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Weather request failed');
        const json = await res.json();
        if (cancelled) return;
        setState({ status: 'ready', location: { name, latitude, longitude }, data: json, isDefault });
      } catch {
        if (cancelled) return;
        setState((prev) => ({ ...prev, status: 'error' }));
      }
    }

    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          const name = await resolveLocationName(latitude, longitude);
          if (!cancelled) loadWeather(latitude, longitude, name, false);
        },
        () => loadWeather(DEFAULT_LOCATION.latitude, DEFAULT_LOCATION.longitude, DEFAULT_LOCATION.name, true),
        { timeout: 8000, maximumAge: 600000 }
      );
    } else {
      loadWeather(DEFAULT_LOCATION.latitude, DEFAULT_LOCATION.longitude, DEFAULT_LOCATION.name, true);
    }

    return () => {
      cancelled = true;
    };
  }, []);

  const { status, location, data, isDefault } = state;
  const current = data?.current;
  const daily = data?.daily;
  const [label, iconType] = current ? describeWeatherCode(current.weather_code) : ['Loading forecast', 'cloud'];

  const forecastDays = (daily?.time ?? []).slice(1, 4).map((date, i) => {
    const idx = i + 1;
    return {
      day: new Date(date).toLocaleDateString('en-GB', { weekday: 'short' }),
      high: Math.round(daily.temperature_2m_max[idx]),
      icon: describeWeatherCode(daily.weather_code[idx])[1]
    };
  });
  const placeholders = [0, 1, 2];

  return (
    <div className="border border-line bg-white max-md:min-h-[155px]">
      <div className="flex items-center gap-[5px] px-[13px] pt-[11px] text-[10px] tracking-[0.14em] text-blue font-bold">
        <PinIcon className="w-[11px] h-[11px]" />
        LOCAL WEATHER
      </div>

      <div className="flex items-start justify-between px-[13px] pt-[6px] gap-2">
        <div className="min-w-0">
          <div className="text-[13px] font-bold truncate">{location.name}</div>
          <p className="text-[11px] text-muted mt-[1px]">
            {status === 'error'
              ? 'Weather unavailable right now'
              : status === 'loading'
              ? 'Finding your forecast…'
              : label}
            {status === 'ready' && typeof current?.wind_speed_10m === 'number'
              ? ` · ${Math.round(current.wind_speed_10m)} km/h wind`
              : ''}
          </p>
        </div>
        <div className="flex items-center gap-[6px] shrink-0">
          <WeatherIcon type={iconType} className="w-6 h-6 text-blue" />
          <strong className="font-serif text-[34px] leading-none tabular-nums">
            {status === 'ready' ? `${Math.round(current.temperature_2m)}°` : '—°'}
          </strong>
        </div>
      </div>

      <div className="mx-[13px] mt-[10px] border-t border-line" />

      <div className="grid grid-cols-3 text-center px-[13px] py-[10px]">
        {(forecastDays.length ? forecastDays : placeholders.map(() => null)).map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-[3px]">
            <span className="text-[10px] text-muted">{d?.day ?? '--'}</span>
            <WeatherIcon type={d?.icon ?? 'cloud'} className="w-[15px] h-[15px] text-muted/70" />
            <b className="text-[11px] tabular-nums">{d ? `${d.high}°` : '--°'}</b>
          </div>
        ))}
      </div>

      {isDefault && status === 'ready' && (
        <p className="px-[13px] pb-[9px] text-[9.5px] text-muted leading-snug">
          Showing Luxembourg — enable location for weather near you.
        </p>
      )}
    </div>
  );
}