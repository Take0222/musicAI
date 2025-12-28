
import React from 'react';

interface TasteInputProps {
  value: string;
  onChange: (value: string) => void;
}

const TasteInput: React.FC<TasteInputProps> = ({ value, onChange }) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="例：インディーポップが好き、Tame Impalaのようなアーティスト、深夜のドライブに合う曲..."
      rows={4}
      className="w-full bg-brand-gray p-3 rounded-lg border-2 border-transparent focus:border-brand-green focus:ring-0 focus:outline-none transition-colors duration-200 text-white placeholder-brand-light-gray/50"
    />
  );
};

export default TasteInput;
