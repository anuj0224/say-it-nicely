'use client';

import React, { useState, useEffect } from 'react';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { Menu, MessageSquareHeart } from "lucide-react";
import { getStoredTheme, applyTheme } from "@/lib/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const theme = getStoredTheme();
    applyTheme(theme);
    setMounted(true);
  }, []);

  // Prevent flash or hydration mismatch
  const content = mounted ? (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#060b18] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      {/* Global Header */}
      <header className="sticky top-0 z-50 w-full px-6 py-4 flex items-center justify-between glass dark:glass-dark border-b border-slate-200/50 dark:border-white/5">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 active:scale-90 transition-all hover:border-blue-500/30"
          >
            <Menu className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-xl">
              <MessageSquareHeart className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-lg tracking-tight uppercase px-1">Say It <span className="text-blue-500">Nicely</span></span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col pt-4 overflow-hidden relative">
        {children}
      </main>
      
      {/* Footer subtle text for mobile */}
      <footer className="py-4 text-center">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] opacity-40">AI-Powered Social Harmony</p>
      </footer>
    </div>
  ) : null;

  return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full m-0 p-0`}>
        {content}
      </body>
    </html>
  );
}
