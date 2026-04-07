'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ChatWindow from '@/components/ChatWindow';
import * as storage from '@/lib/storage';
import { Sparkles, Trash2, Home } from 'lucide-react';

function ChatContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMessage = searchParams.get('initial');
  
  const tone = searchParams.get('tone') || 'Polite';
  const situation = searchParams.get('situation') || 'Friends';
  const outputMode = searchParams.get('outputMode') || 'Auto';

  const [messages, setMessages] = useState<storage.Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Load messages on mount
  useEffect(() => {
    const loadSession = () => {
      const stored = storage.getMessages();
      setMessages(stored);
      
      // If there's an initial message and chat is empty, send it
      if (initialMessage && stored.length === 0) {
        handleSendMessage(initialMessage);
      }
      setInitialized(true);
    };

    loadSession();
  }, [initialMessage]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || loading) return;

    const userMsg = storage.createMessage(content, 'user');
    
    // Optimistic update
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    storage.saveMessage(userMsg);

    setLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          tone,
          situation,
          outputMode,
          history: newMsgs.map(m => ({ role: m.role, content: m.content }))
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to chat');

      const assistantMsg = storage.createMessage(data.output, 'assistant');
      const finalMsgs = [...newMsgs, assistantMsg];
      
      setMessages(finalMsgs);
      storage.saveMessage(assistantMsg);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Clear this chat conversation?')) {
      storage.clearMessages();
      setMessages([]);
      router.push('/');
    }
  };


  if (!initialized) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="w-12 h-12 bg-blue-500 rounded-2xl" />
          <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50 dark:bg-slate-950 px-4 pb-4">
      {/* Mini Chat Actions bar */}
      <div className="max-w-4xl mx-auto w-full flex justify-between items-center py-4 px-2">
        <button 
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-blue-500 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>New</span>
        </button>
        
        <button 
          onClick={handleClearChat}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear Chat</span>
        </button>
      </div>

      <div className="w-full max-w-4xl flex-1 flex flex-col mx-auto relative animate-in fade-in zoom-in-95 duration-500">
        <ChatWindow 
          messages={messages}
          loading={loading}
          onSend={handleSendMessage}
          tone={tone}
          situation={situation}
          outputMode={outputMode}
        />
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div>Chat Loading...</div>}>
      <ChatContent />
    </Suspense>
  );
}
