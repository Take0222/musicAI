
import React from 'react';
import { ThumbUpIcon } from './icons/ThumbUpIcon';
import { ThumbDownIcon } from './icons/ThumbDownIcon';

interface FeedbackProps {
  status: 'good' | 'bad' | null;
  comment: string;
  submitted: boolean;
  onStatusChange: (status: 'good' | 'bad') => void;
  onCommentChange: (comment: string) => void;
  onSubmit: () => void;
}

const Feedback: React.FC<FeedbackProps> = ({
  status,
  comment,
  submitted,
  onStatusChange,
  onCommentChange,
  onSubmit,
}) => {
  if (submitted) {
    return (
      <div className="mt-8 bg-brand-light-dark rounded-xl p-6 text-center transition-all duration-300 animate-fade-in">
        <h3 className="text-xl font-semibold text-brand-green">ご協力ありがとうございます！</h3>
        <p className="text-brand-light-gray mt-2">いただいたフィードバックは、今後の改善に役立てさせていただきます。</p>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-brand-light-dark rounded-xl p-6 transition-all duration-300 animate-fade-in">
      <h3 className="text-lg font-semibold text-center mb-4 text-gray-200">このおすすめは気に入りましたか？</h3>
      
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => onStatusChange('good')}
          className={`flex items-center gap-2 py-2 px-6 rounded-full border-2 transition-all duration-200 ${
            status === 'good'
              ? 'bg-green-500/20 border-brand-green text-white'
              : 'bg-brand-gray border-transparent hover:border-brand-light-gray/50 text-brand-light-gray'
          }`}
        >
          <ThumbUpIcon className="w-5 h-5" />
          <span>良い</span>
        </button>
        <button
          onClick={() => onStatusChange('bad')}
          className={`flex items-center gap-2 py-2 px-6 rounded-full border-2 transition-all duration-200 ${
            status === 'bad'
              ? 'bg-red-500/20 border-red-500 text-white'
              : 'bg-brand-gray border-transparent hover:border-brand-light-gray/50 text-brand-light-gray'
          }`}
        >
          <ThumbDownIcon className="w-5 h-5" />
          <span>悪い</span>
        </button>
      </div>

      <div className="mt-4">
        <textarea
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
          placeholder="（任意）具体的な理由や感想をお聞かせください..."
          rows={3}
          className="w-full bg-brand-gray p-3 rounded-lg border-2 border-transparent focus:border-brand-green focus:ring-0 focus:outline-none transition-colors duration-200 text-white placeholder-brand-light-gray/50"
        />
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={onSubmit}
          disabled={!status}
          className="bg-brand-green text-white font-bold py-2 px-8 rounded-full transition-all duration-300 hover:bg-green-500 disabled:bg-brand-gray disabled:cursor-not-allowed"
        >
          フィードバックを送信
        </button>
      </div>
    </div>
  );
};

export default Feedback;
