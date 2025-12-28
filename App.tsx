
import React, { useState, useCallback } from 'react';
import type { Recommendation } from './types';
import { getMusicRecommendations } from './services/geminiService';
import MoodSelector from './components/MoodSelector';
import WeatherSelector from './components/WeatherSelector';
import TasteInput from './components/TasteInput';
import SpotifyConnect from './components/SpotifyConnect';
import RecommendationList from './components/RecommendationList';
import Feedback from './components/Feedback';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { MusicIcon } from './components/icons/MusicIcon';

const App: React.FC = () => {
  const [mood, setMood] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [taste, setTaste] = useState('');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedbackStatus, setFeedbackStatus] = useState<'good' | 'bad' | null>(null);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const resetFeedback = () => {
    setFeedbackStatus(null);
    setFeedbackComment('');
    setFeedbackSubmitted(false);
  };

  const handleGenerateRecommendations = useCallback(async () => {
    if (!mood || !weather) {
      setError('気分と天気・場所を入力してください。');
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecommendations([]);
    resetFeedback();

    try {
      const results = await getMusicRecommendations(mood, weather, taste);
      setRecommendations(results);
    } catch (err) {
      setError(err instanceof Error ? `おすすめの取得に失敗しました: ${err.message}` : '不明なエラーが発生しました。');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [mood, weather, taste]);

  const handleFeedbackSubmit = () => {
    // In a real application, you would send this data to a server.
    console.log('Feedback submitted:', {
      status: feedbackStatus,
      comment: feedbackComment,
      recommendations: recommendations,
      inputs: { mood, weather, taste }
    });
    setFeedbackSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center gap-4">
            <MusicIcon className="w-12 h-12 text-brand-green" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-green-400 to-teal-400 text-transparent bg-clip-text">
              気分で音楽AI
            </h1>
          </div>
          <p className="mt-4 text-lg text-brand-light-gray max-w-2xl mx-auto">
            今のあなたのための完璧なサウンドトラックを見つけましょう。気分、天気、そしてあなたの音楽の好みを教えてください。
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Inputs */}
          <div className="lg:col-span-4 space-y-8 p-6 bg-brand-light-dark rounded-xl shadow-lg h-fit">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-100">1. 今の気分は？</h2>
              <MoodSelector selectedMood={mood} onSelectMood={setMood} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-100">2. 天気・場所は？</h2>
              <WeatherSelector selectedWeather={weather} onSelectWeather={setWeather} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-100">3. 好みを教えて</h2>
              <TasteInput value={taste} onChange={setTaste} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-100">4. (任意) 精度を高める</h2>
              <SpotifyConnect />
            </div>
            <button
              onClick={handleGenerateRecommendations}
              disabled={isLoading || !mood || !weather}
              className="w-full bg-brand-green text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:bg-green-500 disabled:bg-brand-gray disabled:cursor-not-allowed transform hover:scale-105 disabled:transform-none"
            >
              <SparklesIcon className="w-5 h-5" />
              {isLoading ? 'あなたのための曲を探しています...' : 'おすすめを生成'}
            </button>
            {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-8">
            <RecommendationList recommendations={recommendations} isLoading={isLoading} />
            {!isLoading && recommendations.length > 0 && (
              <Feedback
                status={feedbackStatus}
                comment={feedbackComment}
                submitted={feedbackSubmitted}
                onStatusChange={setFeedbackStatus}
                onCommentChange={setFeedbackComment}
                onSubmit={handleFeedbackSubmit}
              />
            )}
          </div>
        </div>
      </main>
      <footer className="text-center py-6 text-brand-light-gray text-sm">
        <p>Gemini API を利用しています。音楽への情熱を込めてデザインされました。</p>
      </footer>
    </div>
  );
};

export default App;
