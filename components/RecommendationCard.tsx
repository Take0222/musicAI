
import React from 'react';
import type { Recommendation } from '../types';
import { SpotifyIcon } from './icons/SpotifyIcon';

interface RecommendationCardProps {
  recommendation: Recommendation;
  index: number;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation, index }) => {
  const { songTitle, artist, album, reason } = recommendation;
  
  // High quality placeholder image based on the track/artist
  const imageUrl = `https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=200&q=80&sig=${encodeURIComponent(songTitle + artist)}`;
  
  // Strictly ensured clean Spotify URL as requested
  const spotifySearchUrl = `https://open.spotify.com/search/${encodeURIComponent(`${songTitle} ${artist}`)}`;

  return (
    <div 
      className="group bg-brand-light-dark/60 backdrop-blur-sm rounded-xl p-4 transition-all duration-500 hover:bg-brand-gray/80 border border-white/5 hover:border-brand-green/30 shadow-xl flex flex-col sm:flex-row items-center gap-4 sm:gap-6 animate-fade-in" 
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
        <img 
          src={imageUrl} 
          alt={album} 
          className="w-24 h-24 sm:w-28 sm:h-28 object-cover" 
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
      </div>

      <div className="flex-1 w-full sm:w-auto text-center sm:text-left space-y-1">
        <h3 className="text-xl font-bold text-white group-hover:text-brand-green transition-colors duration-300 line-clamp-1">
          {songTitle}
        </h3>
        <p className="text-md font-medium text-brand-light-gray line-clamp-1">
          {artist} <span className="text-white/20 px-1">•</span> {album}
        </p>
        <p className="text-sm text-gray-400 mt-2 italic leading-relaxed line-clamp-2">
          "{reason}"
        </p>
      </div>

      <a
        href={spotifySearchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 w-full sm:w-auto bg-brand-green text-black font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-all duration-300 hover:bg-green-400 hover:scale-105 active:scale-95 shadow-lg shadow-brand-green/20"
        aria-label={`${songTitle} by ${artist} をSpotifyで聴く`}
      >
        <SpotifyIcon className="w-5 h-5" />
        <span className="whitespace-nowrap">今すぐ聴く</span>
      </a>
    </div>
  );
};

// Add fade-in animation to document if it doesn't exist
if (typeof document !== 'undefined') {
  const styleId = 'rec-card-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      @keyframes fade-in {
        from { opacity: 0; transform: translateY(15px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in {
        animation: fade-in 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        opacity: 0;
      }
    `;
    document.head.appendChild(style);
  }
}

export default RecommendationCard;
