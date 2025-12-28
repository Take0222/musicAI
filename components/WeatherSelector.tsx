
import React from 'react';
import { Weather } from '../types';
import { SunnyIcon } from './icons/SunnyIcon';
import { RainyIcon } from './icons/RainyIcon';
import { CloudyIcon } from './icons/CloudyIcon';
import { SnowyIcon } from './icons/SnowyIcon';

interface WeatherSelectorProps {
  selectedWeather: string;
  onSelectWeather: (weather: string) => void;
}

const weatherOptions = [
  { weather: Weather.Sunny, Icon: SunnyIcon },
  { weather: Weather.Rainy, Icon: RainyIcon },
  { weather: Weather.Cloudy, Icon: CloudyIcon },
  { weather: Weather.Snowy, Icon: SnowyIcon },
];

const WeatherSelector: React.FC<WeatherSelectorProps> = ({ selectedWeather, onSelectWeather }) => {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {weatherOptions.map(({ weather, Icon }) => (
          <button
            key={weather}
            onClick={() => onSelectWeather(weather)}
            className={`p-3 rounded-lg flex flex-col items-center justify-center gap-2 border-2 transition-all duration-200 ${
              selectedWeather === weather
                ? 'bg-green-500/20 border-brand-green text-white'
                : 'bg-brand-gray border-transparent hover:border-brand-light-gray/50 text-brand-light-gray'
            }`}
          >
            <Icon className="w-7 h-7" />
            <span className="font-medium text-sm">{weather}</span>
          </button>
        ))}
      </div>
      <input
        type="text"
        value={selectedWeather}
        onChange={(e) => onSelectWeather(e.target.value)}
        placeholder="例：夜の渋谷、雨の日のカフェ..."
        className="w-full bg-brand-gray p-3 rounded-lg border-2 border-transparent focus:border-brand-green focus:ring-0 focus:outline-none transition-colors duration-200 text-white placeholder-brand-light-gray/50"
      />
    </div>
  );
};

export default WeatherSelector;
