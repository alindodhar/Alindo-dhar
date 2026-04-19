/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { User, Award, Trophy, Star, ChevronRight, Save } from 'lucide-react';
import { motion } from 'motion/react';
import { Language, UserProfile, SkillLevel } from '../types';
import { translations } from '../i18n/translations';

interface ProfileProps {
  lang: Language;
  compact?: boolean;
}

export const Profile = ({ lang, compact }: ProfileProps) => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('clicker_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return { name: '', skillLevel: 'Beginner' };
      }
    }
    return { name: '', skillLevel: 'Beginner' };
  });

  const t = translations[lang];

  useEffect(() => {
    localStorage.setItem('clicker_profile', JSON.stringify(profile));
  }, [profile]);

  const skillLevels: SkillLevel[] = ['Beginner', 'Intermediate', 'Pro'];

  if (compact) {
    return (
      <div className="immersive-card p-5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <User size={60} className="text-accent" />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent-muted rounded-full flex items-center justify-center border border-accent/20">
            <User size={18} className="text-accent" />
          </div>
          <div>
            <h4 className="text-sm font-bold truncate max-w-[120px] text-[var(--text)]">{profile.name || 'Photographer'}</h4>
            <div className="text-[9px] font-black text-accent uppercase tracking-widest">{profile.skillLevel}</div>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-1 bg-glass rounded-full overflow-hidden">
            <div className="h-full bg-accent w-[65%]"></div>
          </div>
          <div className="text-[9px] font-bold text-dim uppercase tracking-widest text-center">65% TO MASTER</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-2 space-y-6">
      <div className="immersive-card p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Award size={140} className="text-accent" />
        </div>
        <div className="w-20 h-20 bg-accent-muted rounded-full mx-auto flex items-center justify-center p-1 mb-4 border-[3px] border-[var(--bg)] shadow-[0_0_20px_var(--accent-muted)]">
          <div className="w-full h-full bg-[var(--surface)] rounded-full flex items-center justify-center">
            <User size={32} className="text-accent" />
          </div>
        </div>
        
        <input
          type="text"
          value={profile.name}
          onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
          placeholder={lang === 'en' ? 'Enter your name' : 'আপনার নাম লিখুন'}
          className="text-xl font-extrabold bg-transparent border-none outline-none text-center w-full focus:placeholder-transparent placeholder:text-dim tracking-tight text-[var(--text)]"
        />
        <div className="flex items-center justify-center gap-2 mt-1">
          <span className="text-[10px] font-black bg-accent text-white px-2 py-0.5 rounded tracking-widest uppercase">{profile.skillLevel}</span>
          <span className="text-[10px] font-black border border-accent/30 text-accent px-2 py-0.5 rounded tracking-widest uppercase">PRO EDITION</span>
        </div>

        <div className="mt-8">
          <div className="h-1.5 bg-glass rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '65%' }}
              className="h-full bg-accent"
            ></motion.div>
          </div>
          <div className="text-[10px] font-bold text-dim mt-2 tracking-widest uppercase">Experience: 1,250 XP</div>
        </div>
      </div>

      <div className="immersive-card p-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-dim mb-4 ml-1">{t.profile.skillLevel}</h3>
        <div className="flex gap-2">
          {skillLevels.map(lvl => (
            <button
              key={lvl}
              onClick={() => setProfile(prev => ({ ...prev, skillLevel: lvl }))}
              className={`flex-1 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all border ${
                profile.skillLevel === lvl 
                  ? 'bg-accent text-white border-accent shadow-lg shadow-accent/20' 
                  : 'bg-glass border-[var(--border)] text-dim hover:border-accent/30'
              }`}
            >
              {t.common[lvl.toLowerCase() as keyof typeof t.common]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { label: t.profile.lessonsCompleted, value: '12 / 48', icon: Award, color: 'text-accent' },
          { label: t.profile.quizScores, value: '85%', icon: Trophy, color: 'text-accent' },
          { label: t.profile.points, value: '1,250', icon: Star, color: 'text-accent' },
        ].map((item, i) => (
          <div key={i} className="immersive-card p-5 flex flex-col items-center justify-center gap-2 hover:bg-white/[0.01] cursor-pointer group">
            <div className={`p-3 rounded-2xl bg-accent-muted ${item.color}`}>
              <item.icon size={20} />
            </div>
            <div className="text-center">
              <div className="text-[9px] font-black text-dim uppercase tracking-widest mb-1">{item.label}</div>
              <div className="text-lg font-black text-[var(--text)]">{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
