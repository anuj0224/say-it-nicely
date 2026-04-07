import React from 'react';

const situations = [
  { id: 'Relatives', label: 'Relatives', icon: '👪' },
  { id: 'Neighbours', label: 'Neighbours', icon: '🏠' },
  { id: 'Friends', label: 'Friends', icon: '🤝' },
  { id: 'Work', label: 'Work', icon: '🏢' }
];

interface SituationSelectorProps {
  selectedSituation: string;
  onSelect: (situation: string) => void;
}

const SituationSelector: React.FC<SituationSelectorProps> = ({ selectedSituation, onSelect }) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Situation Context</label>
      <div className="flex flex-wrap gap-2">
        {situations.map((sit) => (
          <button
            key={sit.id}
            onClick={() => onSelect(sit.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 border-2
              ${selectedSituation === sit.id 
                ? 'border-blue-500 bg-blue-500 text-white shadow-lg shadow-blue-500/20' 
                : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
          >
            <span>{sit.icon}</span>
            <span>{sit.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SituationSelector;
