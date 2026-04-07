'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Loader2, 
  User, 
  MessageCircleOff, 
  Sparkles, 
  UserCircle2,
  Copy,
  Check,
  Globe
} from 'lucide-react';
import { Message } from '@/lib/storage';

interface ChatWindowProps {
  messages: Message[];
  loading: boolean;
  onSend: (message: string) => void;
  tone: string;
  situation: string;
  outputMode: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ 
  messages, 
  loading, 
  onSend, 
  tone, 
  situation,
  outputMode
}) => {
  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !loading) {
      onSend(input);
      setInput('');
    }
  };

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-white dark:bg-slate-900/40 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-white/5">
      
      {/* Session Info Header */}
      <div className="p-6 border-b border-slate-50 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/30">
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold rounded-full uppercase tracking-widest">{tone}</span>
          <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-bold rounded-full uppercase tracking-widest">{situation}</span>
          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-[10px] font-bold rounded-full uppercase tracking-widest flex items-center gap-1">
            <Globe className="w-3 h-3" />
            {outputMode || 'Auto'}
          </span>
        </div>
      </div>

      {/* Messages area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
            <Sparkles className="w-12 h-12 mb-4 text-blue-500" />
            <p className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Start the conversation
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div 
              key={msg.id}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}
            >
              <div className={`flex flex-col max-w-[85%] md:max-w-[70%] group`}>
                
                {/* Header for bubble */}
                <div className={`flex items-center gap-2 mb-2 px-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {msg.role === 'user' ? (
                    <div className="bg-slate-200 dark:bg-slate-800 p-1 rounded-full"><User className="w-3 h-3 text-slate-500" /></div>
                  ) : (
                    <div className="bg-blue-500 p-1 rounded-full"><Sparkles className="w-3 h-3 text-white" /></div>
                  )}
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {msg.role === 'user' ? 'Your Task' : 'Polite Reply'}
                  </span>
                </div>

                {/* Bubble content */}
                <div className={`relative p-5 rounded-[2rem] shadow-sm transform transition-all duration-300
                  ${msg.role === 'user' 
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tr-sm' 
                    : 'bg-blue-600 text-white rounded-tl-sm shadow-xl shadow-blue-600/20'
                  }`}
                >
                  <p className="text-base leading-relaxed font-medium">{msg.content}</p>
                </div>

                {/* Bubble Footer / Actions */}
                <div className={`flex items-center gap-3 mt-2 px-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <span className="text-[9px] font-medium text-slate-400 uppercase opacity-60">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {msg.role === 'assistant' && (
                    <button 
                      onClick={() => handleCopy(msg.content, msg.id)}
                      className="p-1 hover:text-blue-500 text-slate-400 transition-colors"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3.5 h-3.5 text-green-500 animate-in zoom-in" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}

        {loading && (
          <div className="flex items-start animate-in fade-in duration-300">
            <div className="flex flex-col items-start max-w-[70%]">
              <div className="flex items-center gap-2 mb-2 px-2">
                <div className="bg-blue-500 p-1 rounded-full animate-bounce"><Loader2 className="w-3 h-3 text-white animate-spin" /></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic animate-pulse">Assistant is thinking...</span>
              </div>
              <div className="p-6 rounded-[2rem] rounded-tl-sm bg-slate-100 dark:bg-slate-800 border dark:border-white/5 shadow-inner">
                <div className="flex gap-1.5 h-2 items-center">
                  <div className="w-1.5 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Form at bottom */}
      <form 
        onSubmit={handleSubmit}
        className="p-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-white/5 relative"
      >
        <div className="relative flex items-center gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Type your rude thought here..."
            className="flex-1 bg-white dark:bg-slate-950 p-5 rounded-[2rem] border-2 border-transparent focus:border-blue-500/50 shadow-inner outline-none transition-all resize-none text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
            rows={1}
          />
          <button 
            type="submit"
            disabled={!input.trim() || loading}
            className={`p-5 rounded-full shadow-lg transition-all active:scale-95 flex items-center justify-center
              ${!input.trim() || loading 
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30'
              }`}
          >
            <Send className={`w-5 h-5 ${loading ? 'opacity-0' : 'opacity-100'}`} />
            {loading && <Loader2 className="w-5 h-5 animate-spin absolute" />}
          </button>
        </div>
        <p className="mt-3 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest transition-opacity duration-300">
          Be respectful, keep it nice.
        </p>
      </form>
    </div>
  );
};

export default ChatWindow;
