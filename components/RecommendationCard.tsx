import React from 'react';
import type { Recommendation } from '../types';
import { SpotifyIcon } from './icons/SpotifyIcon';

interface RecommendationCardProps {
  recommendation: Recommendation;
  index: number;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation, index }) => {
  const { songTitle, artist, album, reason } = recommendation;
  const imageUrl = `https://picsum.photos/seed/${encodeURIComponent(songTitle + artist)}/200`;
  const spotifySearchUrl = `https://open.spotify.com/search/${encodeURIComponent(`${songTitle} ${artist}`)}`;

  return (
    <div 
      className="bg-brand-light-dark rounded-xl p-4 transition-all duration-300 hover:bg-brand-gray shadow-lg flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5 animate-fade-in" 
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <img src={imageUrl} alt={album} className="w-24 h-24 object-cover rounded-md flex-shrink-0" />
      <div className="flex-1 w-full sm:w-auto text-center sm:text-left">
        <h3 className="text-xl font-bold text-white truncate">{songTitle}</h3>
        <p className="text-md text-brand-light-gray">{artist} &bull; {album}</p>
        <p className="text-sm text-gray-400 mt-2 italic">"{reason}"</p>
      </div>
      <a
        href={spotifySearchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 bg-brand-green text-white font-semibold py-2 px-5 rounded-full flex items-center justify-center gap-2 transition-transform transform hover:scale-105"
        aria-label={`${songTitle} by ${artist} をSpotifyで聴く`}
      >
        <SpotifyIcon className="w-5 h-5" />
        <span>今すぐ聴く</span>
      </a>
    </div>
  );
};

// Add fade-in animation to tailwind config or a style tag if not using config file
const style = document.createElement('style');
style.innerHTML = `
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
  opacity: 0;
}
`;
document.head.appendChild(style);


export default RecommendationCard;