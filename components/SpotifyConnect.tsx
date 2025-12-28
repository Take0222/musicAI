
import React from 'react';
import { SpotifyIcon } from './icons/SpotifyIcon';

const SpotifyConnect: React.FC = () => {
  return (
    <div className="text-center p-4 bg-brand-gray rounded-lg">
      <button
        disabled
        className="w-full bg-gray-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed"
      >
        <SpotifyIcon className="w-6 h-6" />
        Spotifyと連携
      </button>
      <p className="text-xs text-brand-light-gray mt-2">
        <strong>注：</strong>Spotifyとの完全な連携は将来の機能です。現状では、上のテキストボックスに好きなアーティストや曲を記述していただくことで、より精度の高いおすすめが可能です！
      </p>
    </div>
  );
};

export default SpotifyConnect;
