'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  ChevronRight, 
  Globe, 
  MessageCircleQuestion, 
  Keyboard
} from 'lucide-react';
import ToneSelector from '@/components/ToneSelector';
import SituationSelector from '@/components/SituationSelector';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [message, setMessage] = useState('');
  const [tone, setTone] = useState('Polite');
  const [situation, setSituation] = useState('Friends');
  const [outputMode, setOutputMode] = useState('Auto');
  const router = useRouter();

  const handleStartChat = () => {
    if (!message.trim()) return;

    // Build query params
    const query = new URLSearchParams({
      initial: message,
      tone,
      situation,
      outputMode
    }).toString();
    
    // Redirect to the single chat page
    router.push(`/chat?${query}`);
  };

  const outputModes = ['Auto', 'English', 'Hinglish'];

  return (
    <div className="flex-1 flex flex-col items-center justify-start overflow-y-auto px-4 pt-10 pb-20 bg-slate-50 dark:bg-slate-950">
      
      {/* Title Hero */}
      <div className="text-center mb-10 max-w-sm">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tighter">
          Rewrite your <span className="text-blue-500">Blunt</span> thoughts.
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Configure your context and let AI turn your raw emotions into social grace.</p>
      </div>

      <div className="w-full max-w-xl space-y-8 bg-white dark:bg-slate-900/50 p-6 md:p-10 rounded-[3rem] shadow-xl border border-slate-100 dark:border-white/5 animate-in slide-in-from-bottom-5 fade-in duration-700">
        
        {/* Output Mode Toggle */}
        <div className="space-y-3">
          <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1 flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-blue-500" />
            <span>Output Mode</span>
          </label>
          <div className="flex p-1.5 bg-slate-100 dark:bg-slate-950 rounded-2xl gap-1">
            {outputModes.map((mode) => (
              <button
                key={mode}
                onClick={() => setOutputMode(mode)}
                className={`flex-1 py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300
                  ${outputMode === mode 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 active:scale-95' 
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Tone and Situation using existing components */}
        <ToneSelector selectedTone={tone} onSelect={setTone} />
        <SituationSelector selectedSituation={situation} onSelect={setSituation} />

        {/* First Message Input */}
        <div className="space-y-3">
          <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1 flex items-center gap-2">
            <Keyboard className="w-3.5 h-3.5 text-blue-500" />
            <span>Raw Thought</span>
          </label>
          <div className="relative group">
            <textarea
              placeholder="What do you really want to say?"
              className="w-full min-h-[140px] p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-blue-500/50 focus:ring-0 outline-none transition-all duration-300 text-lg resize-none placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-inner group-hover:bg-slate-100 dark:group-hover:bg-slate-900/50"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="absolute top-4 right-6 text-[10px] font-bold text-slate-300 uppercase tracking-widest pointer-events-none">{message.length}/500</div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleStartChat}
          disabled={!message.trim()}
          className={`w-full py-6 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 transition-all duration-500 active:scale-95
            ${!message.trim()
              ? 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600 cursor-not-allowed' 
              : 'bg-blue-600 text-white shadow-2xl shadow-blue-600/30 hover:bg-blue-700'
            }`}
        >
          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="uppercase tracking-widest text-base">Get Polite Reply</span>
          <ChevronRight className="w-5 h-5 opacity-50" />
        </button>

      </div>

      {/* Suggested prompts */}
      <div className="mt-12 w-full max-w-xl">
        <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] text-center mb-6 px-1 flex items-center justify-center gap-2">
          <MessageCircleQuestion className="w-3.5 h-3.5" />
          Quick Ideas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 opacity-70 hover:opacity-100 transition-opacity">
          {[
            "Cancel a gym membership politely.",
            "Tell a friend they owe you money.",
            "Say no to a late meeting ask.",
            "Ask my noisy neighbor to be quiet."
          ].map((prompt, i) => (
            <button 
              key={i}
              onClick={() => setMessage(prompt)}
              className="text-left p-4 bg-white/50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-white/5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:border-blue-500/30 hover:text-blue-500 transition-all active:scale-[0.98] shadow-sm hover:shadow-md"
            >
              "{prompt}"
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
