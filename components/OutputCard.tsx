import React, { useState } from 'react';
import { Copy, Check, Share2, CornerDownRight } from 'lucide-react';

interface OutputCardProps {
  output: string;
  loading: boolean;
}

const OutputCard: React.FC<OutputCardProps> = ({ output, loading }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!output && !loading) return null;

  return (
    <div className={`mt-8 transition-all duration-500 transform text-blue-500 ${output || loading ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      <div className="relative glass dark:glass-dark rounded-[2.5rem] p-8 shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10 group">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500 opacity-50 transition-all duration-300 group-hover:w-2 group-hover:opacity-100" />

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-blue-500 font-bold tracking-tight px-1">
            <CornerDownRight className="w-5 h-5" />
            <span className="uppercase text-xs tracking-widest px-2 py-1 rounded bg-blue-500/10 dark:bg-blue-500/20">Generated Reply</span>
          </div>

          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-12 py-3 rounded-full text-sm font-semibold transition-all duration-300 transform active:scale-95
              ${copied
                ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-md hover:shadow-lg'}`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 animate-in zoom-in" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col gap-3 py-4 animate-pulse">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full w-3/4" />
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full w-1/2" />
          </div>
        ) : (
          <div className="relative min-h-[50px] transition-all duration-300">
            <p className="text-xl leading-relaxed text-slate-800 dark:text-slate-100 font-medium">
              {output}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputCard;
