
import React from 'react';
import { Mood } from '../types';
import { HappyIcon } from './icons/HappyIcon';
import { SadIcon } from './icons/SadIcon';
import { ChillIcon } from './icons/ChillIcon';
import { EnergeticIcon } from './icons/EnergeticIcon';

interface MoodSelectorProps {
  selectedMood: string;
  onSelectMood: (mood: string) => void;
}

const moodOptions = [
  { mood: Mood.Happy, Icon: HappyIcon },
  { mood: Mood.Sad, Icon: SadIcon },
  { mood: Mood.Chill, Icon: ChillIcon },
  { mood: Mood.Energetic, Icon: EnergeticIcon },
];

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onSelectMood }) => {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {moodOptions.map(({ mood, Icon }) => (
          <button
            key={mood}
            onClick={() => onSelectMood(mood)}
            className={`p-3 rounded-lg flex flex-col items-center justify-center gap-2 border-2 transition-all duration-200 ${
              selectedMood === mood
                ? 'bg-green-500/20 border-brand-green text-white'
                : 'bg-brand-gray border-transparent hover:border-brand-light-gray/50 text-brand-light-gray'
            }`}
          >
            <Icon className="w-7 h-7" />
            <span className="font-medium text-sm">{mood}</span>
          </button>
        ))}
      </div>
      <input
        type="text"
        value={selectedMood}
        onChange={(e) => onSelectMood(e.target.value)}
        placeholder="または、具体的に記述してください..."
        className="w-full bg-brand-gray p-3 rounded-lg border-2 border-transparent focus:border-brand-green focus:ring-0 focus:outline-none transition-colors duration-200 text-white placeholder-brand-light-gray/50"
      />
    </div>
  );
};

export default MoodSelector;
