/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Navbar } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { PhotographyBrain } from './components/PhotographyBrain';
import { VideographyBrain } from './components/VideographyBrain';
import { SmartSettings } from './components/SmartSettings';
import { ChatAssistant } from './components/ChatAssistant';
import { LearningLab } from './components/LearningLab';
import { ShotCreator } from './components/ShotCreator';
import { Profile } from './components/Profile';
import { ToolsGuides } from './components/ToolsGuides';
import { Projects } from './components/Projects';
import { Favorites } from './components/Favorites';
import { Language } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('clicker_lang');
    return (saved as Language) || 'en';
  });
  
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('clicker_theme');
    return (saved as 'dark' | 'light') || 'dark';
  });

  const [stage, setStage] = useState('dashboard');

  useEffect(() => {
    localStorage.setItem('clicker_lang', lang);
    localStorage.setItem('clicker_theme', theme);
    document.documentElement.className = theme === 'light' ? 'light' : '';
  }, [lang, theme]);

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'bn' : 'en');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const navItems = [
    { id: 'dashboard', icon: '🏠', label: { en: 'Dashboard', bn: 'ড্যাশবোর্ড' } },
    { id: 'photoBrain', icon: '📸', label: { en: 'Photography Brain', bn: 'ফটোগ্রাফি ব্রেন' } },
    { id: 'videoBrain', icon: '🎥', label: { en: 'Videography Brain', bn: 'ভিডিওগ্রাফি ব্রেন' } },
    { id: 'smartSettings', icon: '⚙️', label: { en: 'Smart Settings', bn: 'স্মার্ট সেটিংস' } },
    { id: 'shotCreator', icon: '🎬', label: { en: 'Shot Creator', bn: 'শট ক্রিয়েটর' } },
    { id: 'learningLab', icon: '📚', label: { en: 'Learning Lab', bn: 'লার্নিং ল্যাব' } },
    { id: 'projects', icon: '📂', label: { en: 'Projects', bn: 'প্রজেক্টস' } },
    { id: 'favorites', icon: '⭐', label: { en: 'Favorites', bn: 'ফেভারিটস' } },
    { id: 'chatAssistant', icon: '💬', label: { en: 'Chat Assistant', bn: 'চ্যাট অ্যাসিস্ট্যান্ট' } },
    { id: 'profile', icon: '👤', label: { en: 'Profile', bn: 'প্রোফাইল' } },
  ];

  const renderContent = () => {
    switch (stage) {
      case 'dashboard':
        return <Dashboard onSelectStage={setStage} lang={lang} />;
      case 'photoBrain':
        return <PhotographyBrain lang={lang} />;
      case 'videoBrain':
        return <VideographyBrain lang={lang} />;
      case 'smartSettings':
        return <SmartSettings lang={lang} />;
      case 'chatAssistant':
        return <ChatAssistant lang={lang} />;
      case 'learningLab':
        return <LearningLab lang={lang} />;
      case 'shotCreator':
        return <ShotCreator lang={lang} />;
      case 'toolsGuides':
        return <ToolsGuides lang={lang} />;
      case 'projects':
        return <Projects lang={lang} />;
      case 'favorites':
        return <Favorites lang={lang} />;
      case 'profile':
        return <Profile lang={lang} />;
      default:
        return <Dashboard onSelectStage={setStage} lang={lang} />;
    }
  };

  return (
    <div className={`min-h-screen bg-[var(--bg)] text-[var(--text)] transition-all duration-300 ${lang === 'bn' ? 'bn-font' : ''} selection:bg-accent/30`}>
      <Navbar 
        currentStage={stage} 
        onBack={() => setStage('dashboard')} 
        lang={lang} 
        onToggleLang={toggleLang} 
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      
      <div className="flex pt-[70px] h-screen overflow-hidden px-4 md:px-8 gap-6 max-w-[1600px] mx-auto">
        {/* Sidebar - Desktop Only */}
        <aside className="hidden lg:flex flex-col w-[280px] shrink-0 gap-6 py-6 overflow-y-auto no-scrollbar">
          <div className="immersive-card p-4">
            <nav className="flex flex-col gap-1.5">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setStage(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all border text-sm font-semibold ${
                    stage === item.id 
                      ? 'bg-accent-muted border-accent text-accent shadow-sm' 
                      : 'border-transparent text-dim hover:bg-glass hover:border-accent/20'
                  }`}
                >
                  <span className="text-lg grayscale-[0.5]">{item.icon}</span>
                  <span>{lang === 'en' ? item.label.en : item.label.bn}</span>
                </button>
              ))}
            </nav>
          </div>
          <Profile lang={lang} compact={true} />
        </aside>

        {/* Main View Area */}
        <main className="flex-1 overflow-y-auto no-scrollbar py-6">
          <div className="max-w-4xl mx-auto min-h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="pb-24"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Intelligence Side Panel - Extra Large Only */}
        <aside className="hidden xl:flex flex-col w-[320px] shrink-0 py-6 overflow-hidden">
          <ChatAssistant lang={lang} />
        </aside>
      </div>
      
      <footer className="fixed bottom-0 left-0 right-0 p-3 text-[10px] text-center text-dim bg-[var(--bg)] border-t border-[var(--border)] pointer-events-none uppercase tracking-widest font-black transition-colors">
        Clicker AI — Offline Suite • Engineered for Clarity
      </footer>
    </div>
  );
}

