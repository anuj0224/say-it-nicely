'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Moon, 
  Sun, 
  Settings2,
  Trash2,
  Home
} from 'lucide-react';
import * as storage from '@/lib/storage';
import { applyTheme, getStoredTheme, Theme } from '@/lib/theme';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [theme, setTheme] = useState<Theme>('system');
  const router = useRouter();

  useEffect(() => {
    setTheme(getStoredTheme());
  }, [isOpen]);

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear your current conversation?')) {
      storage.clearMessages();
      onClose();
      router.push('/');
    }
  };


  const handleToggleTheme = () => {
    const next: Theme = theme === 'light' ? 'dark' : (theme === 'dark' ? 'system' : 'light');
    setTheme(next);
    applyTheme(next);
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={onClose}
      />
      
      <aside className={`fixed top-0 left-0 h-full w-[300px] bg-white dark:bg-slate-950 z-[70] shadow-2xl transition-transform duration-500 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col border-r border-slate-100 dark:border-white/5`}>
        
        <div className="p-6 flex items-center justify-between border-b border-slate-50 dark:border-white/5 bg-slate-50 dark:bg-slate-900/30">
          <div className="flex items-center gap-2 font-black text-xs uppercase tracking-widest dark:text-white">
            <Settings2 className="w-4 h-4 text-blue-500" />
            <span>Options</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="flex-1 p-6 space-y-4">
          <button 
            onClick={() => { onClose(); router.push('/'); }}
            className="flex items-center gap-3 w-full p-5 bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 dark:text-blue-400 rounded-2xl transition-all font-black text-xs uppercase tracking-widest"
          >
            <Home className="w-4 h-4" />
            <span>New Session</span>
          </button>

          <button 
            onClick={handleClear}
            className="flex items-center gap-3 w-full p-5 bg-red-600/10 hover:bg-red-600/20 text-red-600 dark:text-red-400 rounded-2xl transition-all font-black text-xs uppercase tracking-widest"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Current</span>
          </button>
        </div>

        <div className="p-6 border-t border-slate-50 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/30">
          <button 
            onClick={handleToggleTheme}
            className="flex items-center gap-3 w-full p-5 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-white/5 transition-all text-slate-700 dark:text-slate-300"
          >
            {theme === 'light' ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-blue-400" />}
            <div className="text-left flex-1">
              <p className="text-[10px] font-black uppercase tracking-widest">Theme: {theme}</p>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Tap to switch</p>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
