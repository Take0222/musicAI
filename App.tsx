
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
    if (!mood && !weather) {
      setError('気分や天気を選択、または入力してください。');
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
    console.log('Feedback submitted:', {
      status: feedbackStatus,
      comment: feedbackComment,
      recommendations: recommendations,
      inputs: { mood, weather, taste }
    });
    setFeedbackSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-green selection:text-black">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-brand-green/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[50%] bg-teal-500/5 rounded-full blur-[100px]" />
      </div>

      <main className="relative container mx-auto px-4 py-12 md:py-20 max-w-7xl">
        <header className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="p-3 bg-brand-green/10 rounded-2xl">
              <MusicIcon className="w-10 h-10 text-brand-green" />
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-green-400 to-emerald-400 text-transparent bg-clip-text">
              Mood Music AI
            </h1>
          </div>
          <p className="text-xl text-brand-light-gray max-w-2xl mx-auto leading-relaxed">
            今のあなたの心と環境にシンクロする、究極の5曲をAIがキュレーション。
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left Column: Inputs */}
          <div className="lg:col-span-4 space-y-10 p-8 bg-brand-light-dark/40 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl h-fit sticky top-8">
            <section>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white/90">
                <span className="w-6 h-6 flex items-center justify-center bg-brand-green text-black text-xs rounded-full">1</span>
                今の気分は？
              </h2>
              <MoodSelector selectedMood={mood} onSelectMood={setMood} />
            </section>

            <section>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white/90">
                <span className="w-6 h-6 flex items-center justify-center bg-brand-green text-black text-xs rounded-full">2</span>
                天気・場所は？
              </h2>
              <WeatherSelector selectedWeather={weather} onSelectWeather={setWeather} />
            </section>

            <section>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white/90">
                <span className="w-6 h-6 flex items-center justify-center bg-brand-green text-black text-xs rounded-full">3</span>
                好みを教えて（任意）
              </h2>
              <TasteInput value={taste} onChange={setTaste} />
            </section>

            <button
              onClick={handleGenerateRecommendations}
              disabled={isLoading || (!mood && !weather)}
              className="group relative w-full overflow-hidden bg-brand-green text-black font-extrabold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:bg-green-400 disabled:bg-brand-gray disabled:text-brand-light-gray disabled:cursor-not-allowed transform active:scale-95 shadow-xl shadow-brand-green/20"
            >
              <SparklesIcon className="w-5 h-5 transition-transform group-hover:rotate-12" />
              <span>{isLoading ? 'セレクト中...' : 'おすすめを生成'}</span>
            </button>
            
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center animate-shake">
                {error}
              </div>
            )}
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-8">
            <div className="min-h-[600px]">
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
        </div>
      </main>

      <footer className="border-t border-white/5 py-10 text-brand-light-gray text-sm backdrop-blur-md">
        <div className="container mx-auto px-4 text-center">
          <p className="flex items-center justify-center gap-2 mb-2">
            Built with <span className="text-brand-green">Gemini 3 Flash</span>
          </p>
          <p className="opacity-60">&copy; 2024 Mood Music AI. Discover your next favorite track.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
