/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Home, ArrowLeft, Globe, Sun, Moon } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface NavbarProps {
  currentStage: string;
  onBack: () => void;
  lang: Language;
  onToggleLang: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar = ({ currentStage, onBack, lang, onToggleLang, theme, onToggleTheme }: NavbarProps) => {
  const t = translations[lang];

  return (
    <nav className="fixed top-0 left-0 right-0 h-[70px] bg-[var(--bg)] border-b border-[var(--border)] z-50 flex items-center justify-between px-6 md:px-10 backdrop-blur-md bg-opacity-80 transition-colors duration-300">
      <div className="flex items-center gap-6">
        {currentStage !== 'dashboard' && (
          <button 
            onClick={onBack}
            className="p-2 hover:bg-glass rounded-xl transition-all border border-transparent hover:border-accent text-accent"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <div className="flex flex-col">
          <div className="text-xl md:text-2xl font-extrabold tracking-tighter text-[var(--text)]">
            CLICKER<span className="text-accent">AI</span>
          </div>
          <span className="text-[10px] font-black tracking-[0.2em] uppercase opacity-30 leading-none mt-1">LENS MENTOR</span>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-xl border border-[var(--border)] hover:border-accent transition-all text-dim hover:text-accent"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          onClick={onToggleLang}
          className="flex items-center gap-2.5 px-4 py-2 bg-glass border border-[var(--border)] rounded-xl cursor-pointer transition-all active:scale-95 hover:border-accent group"
        >
          <span className={`text-xs font-bold ${lang === 'en' ? 'text-accent' : 'text-dim group-hover:text-accent opacity-50'}`}>EN</span>
          <span className="opacity-30 text-xs">|</span>
          <span className={`text-xs font-bold ${lang === 'bn' ? 'text-accent' : 'text-dim group-hover:text-accent opacity-50'}`}>বাং</span>
        </button>
      </div>
    </nav>
  );
};
