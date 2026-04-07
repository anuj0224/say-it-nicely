import React from 'react';

const tones = [
  { id: 'Polite', label: 'Polite', emoji: '🙂', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' },
  { id: 'Very Polite', label: 'Very Polite', emoji: '🙏', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' },
  { id: 'Firm but Respectful', label: 'Firm but Respectful', emoji: '💼', color: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400' },
  { id: 'Casual Friendly', label: 'Casual Friendly', emoji: '😊', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' }
];

interface ToneSelectorProps {
  selectedTone: string;
  onSelect: (tone: string) => void;
}

const ToneSelector: React.FC<ToneSelectorProps> = ({ selectedTone, onSelect }) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Choose Tone</label>
      <div className="grid grid-cols-2 gap-3">
        {tones.map((tone) => (
          <button
            key={tone.id}
            onClick={() => onSelect(tone.id)}
            className={`flex items-center gap-3 p-4 rounded-3xl transition-all duration-300 border-2 text-left active:scale-[0.98]
              ${selectedTone === tone.id 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-sm' 
                : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-200 dark:hover:border-blue-800'
              }`}
          >
            <span className="text-2xl">{tone.emoji}</span>
            <span className="text-sm font-medium">{tone.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToneSelector;
