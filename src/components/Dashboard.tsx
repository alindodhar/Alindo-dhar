/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Camera, 
  Video, 
  Settings, 
  PlusCircle, 
  GraduationCap, 
  MessageSquare, 
  Compass, 
  User,
  Star,
  BookOpen,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface DashboardProps {
  onSelectStage: (stage: string) => void;
  lang: Language;
}

export const Dashboard = ({ onSelectStage, lang }: DashboardProps) => {
  const t = translations[lang];
  const [shotProgress, setShotProgress] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('clicker_shot_progress');
    if (saved) {
      const data = JSON.parse(saved);
      const allShots = Object.values(data).flat();
      setShotProgress(allShots.length);
    }
  }, []);

  const cards = [
    { id: 'photoBrain', title: t.sections.photoBrain, icon: Camera, color: 'bg-blue-500/10 text-blue-400' },
    { id: 'videoBrain', title: t.sections.videoBrain, icon: Video, color: 'bg-red-500/10 text-red-400' },
    { id: 'smartSettings', title: t.sections.smartSettings, icon: Settings, color: 'bg-orange-500/10 text-orange-400' },
    { id: 'shotCreator', title: t.sections.shotCreator, icon: PlusCircle, color: 'bg-emerald-500/10 text-emerald-400' },
    { id: 'learningLab', title: t.sections.learningLab, icon: GraduationCap, color: 'bg-purple-500/10 text-purple-400' },
    { id: 'chatAssistant', title: t.sections.chatAssistant, icon: MessageSquare, color: 'bg-pink-500/10 text-pink-400' },
    { id: 'toolsGuides', title: t.sections.toolsGuides, icon: Compass, color: 'bg-amber-500/10 text-amber-400' },
    { id: 'profile', title: t.sections.profile, icon: User, color: 'bg-zinc-500/10 text-zinc-400' },
    { id: 'projects', title: t.sections.projects, icon: BookOpen, color: 'bg-sky-500/10 text-sky-400' },
    { id: 'favorites', title: t.sections.favorites, icon: Star, color: 'bg-yellow-500/10 text-yellow-400' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    show: { opacity: 1, scale: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 gap-5 py-4"
    >
      {cards.map((card) => (
        <motion.button
          key={card.id}
          variants={item}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectStage(card.id)}
          className="immersive-card p-6 group flex flex-col justify-between items-start h-full min-h-[160px] text-left transition-all relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <card.icon size={80} className="text-accent" />
          </div>
          <div className="flex flex-col gap-4 relative z-10">
            <div className={`p-3 rounded-2xl w-fit ${card.color}`}>
              <card.icon size={22} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight leading-tight text-[var(--text)] group-hover:text-accent transition-colors">
                {card.title}
              </span>
              <span className="text-[11px] text-dim mt-2 line-clamp-2 font-medium max-w-[180px]">
                {lang === 'en' ? 'Professional module for detailed ' + card.title.toLowerCase() : card.title + ' এর জন্য আধুনিক মডিউল'}
              </span>
            </div>
          </div>
          <div className="mt-4 text-[10px] font-black text-accent opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 flex items-center gap-2 uppercase tracking-[0.2em]">
            {lang === 'en' ? 'Launch Module' : 'শুরু করুন'} <ChevronRight size={14} />
          </div>
        </motion.button>
      ))}

      {/* Daily Tip Widget */}
      <motion.div
        variants={item}
        className="col-span-full p-8 immersive-card relative overflow-hidden group bg-glass"
      >
        <div className="absolute -top-[50px] -right-[50px] w-[200px] h-[200px] bg-accent blur-[120px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-accent/20 rounded-lg">
             <Star size={16} className="text-accent animate-pulse" />
          </div>
          <span className="text-[10px] uppercase font-black tracking-[0.3em] text-accent">Active Insight</span>
        </div>
        <p className="text-xl font-extrabold tracking-tight leading-relaxed italic text-[var(--text)] max-w-2xl">
          "{lang === 'en' ? 'The best camera is the one you have with you.' : 'সেরা ক্যামেরাটি হলো সেটি যা আপনার সাথেই আছে।'}"
        </p>
        <div className="flex justify-between items-center mt-6">
          <p className="text-[11px] text-dim uppercase font-black tracking-[0.2em]">— Chase Jarvis</p>
          <div className="h-1 bg-glass w-24 rounded-full overflow-hidden">
             <div className="h-full bg-accent animate-pulse w-full"></div>
          </div>
        </div>
      </motion.div>

      {/* Active Task Mini Widget */}
      {shotProgress > 0 && (
        <motion.div
          variants={item}
          onClick={() => onSelectStage('shotCreator')}
          className="col-span-full p-5 immersive-card bg-accent-muted border-accent/20 cursor-pointer hover:bg-accent/10 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-accent text-white rounded-xl shadow-lg shadow-accent/20 transition-transform group-hover:scale-110">
              <PlusCircle size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-accent">{lang === 'en' ? 'Active Production' : 'চলমান উৎপাদন'}</h4>
              <p className="text-[10px] font-black text-dim uppercase tracking-widest mt-0.5">
                {shotProgress} {lang === 'en' ? 'Tasks in progress' : 'টি কাজ প্রক্রিয়াধীন'}
              </p>
            </div>
          </div>
          <ChevronRight size={18} className="text-accent group-hover:translate-x-1 transition-all" />
        </motion.div>
      )}
    </motion.div>
  );
};
