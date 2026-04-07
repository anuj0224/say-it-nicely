import React from 'react';
import { MessageCircleHeart } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex flex-col items-center justify-center py-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-blue-500 p-2.5 rounded-2xl shadow-blue-500/30 shadow-lg">
          <MessageCircleHeart className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Say It <span className="text-blue-500">Nicely</span>
        </h1>
      </div>
      <p className="text-slate-500 dark:text-slate-400 text-center max-w-sm px-6">
        Turn your raw thoughts into polite and respectful responses instantly.
      </p>
    </header>
  );
};

export default Header;
