
import React from 'react';
import type { Recommendation } from '../types';
import RecommendationCard from './RecommendationCard';
import { MusicIcon } from './icons/MusicIcon';

interface RecommendationListProps {
  recommendations: Recommendation[];
  isLoading: boolean;
}

const LoadingSkeleton: React.FC = () => (
  <div className="animate-pulse bg-brand-gray rounded-lg p-4 flex items-center space-x-4">
    <div className="w-20 h-20 bg-brand-light-dark rounded"></div>
    <div className="flex-1 space-y-3">
      <div className="h-4 bg-brand-light-dark rounded w-3/4"></div>
      <div className="h-3 bg-brand-light-dark rounded w-1/2"></div>
      <div className="h-3 bg-brand-light-dark rounded w-full mt-2"></div>
    </div>
  </div>
);

const RecommendationList: React.FC<RecommendationListProps> = ({ recommendations, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-200 mb-4">プレイリストを作成中...</h2>
        {Array.from({ length: 5 }).map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-brand-light-dark rounded-xl p-8 text-center min-h-[400px]">
        <MusicIcon className="w-20 h-20 text-brand-gray mb-6" />
        <h2 className="text-2xl font-bold text-gray-200">あなたへのおすすめ</h2>
        <p className="text-brand-light-gray mt-2 max-w-sm">
          気分と天気を選んで「おすすめを生成」ボタンを押すと、次のお気に入りの曲が見つかります。
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-200 mb-6">あなたへのおすすめ</h2>
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <RecommendationCard key={index} recommendation={rec} index={index} />
        ))}
      </div>
    </div>
  );
};

export default RecommendationList;
