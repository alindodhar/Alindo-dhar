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

  const [stats, setStats] = useState({
    shots: 0,
    avgQuiz: 0,
    points: 0,
    experience: 0
  });

  const t = translations[lang];

  useEffect(() => {
    const shotData = JSON.parse(localStorage.getItem('clicker_shot_progress') || '{}');
    const quizData = JSON.parse(localStorage.getItem('clicker_quiz_scores') || '[]');
    
    const completedShots = Object.values(shotData).flat().length;
    
    const totalQuizScore = quizData.reduce((acc: number, q: any) => acc + (q.correct / q.total), 0);
    const avgQuiz = quizData.length > 0 ? Math.round((totalQuizScore / quizData.length) * 100) : 0;
    
    // Calculate experience points
    const xp = (completedShots * 150) + (quizData.length * 200);
    const pts = xp + Math.round(totalQuizScore * 500);

    setStats({
      shots: completedShots,
      avgQuiz,
      points: pts,
      experience: xp
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('clicker_profile', JSON.stringify(profile));
  }, [profile]);

  const skillLevels: SkillLevel[] = ['Beginner', 'Intermediate', 'Pro'];

  const handleReset = () => {
    if (confirm(lang === 'en' ? 'Are you sure? This will clear all progress.' : 'আপনি কি নিশ্চিত? এটি আপনার সব প্রগ্রেস মুছে ফেলবে।')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const masterProgress = Math.min(Math.round((stats.experience / 5000) * 100), 100);

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
            <h4 className="text-sm font-bold truncate max-w-[120px] text-[var(--text)]">{profile.name || (lang === 'en' ? 'User' : 'ইউজার')}</h4>
            <div className="text-[9px] font-black text-accent uppercase tracking-widest">{profile.skillLevel}</div>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-1 bg-glass rounded-full overflow-hidden">
            <div className="h-full bg-accent transition-all duration-1000" style={{ width: `${masterProgress}%` }}></div>
          </div>
          <div className="text-[9px] font-bold text-dim uppercase tracking-widest text-center">{masterProgress}% TO MASTER</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-2 space-y-6">
      <div className="immersive-card p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 right-10 rotate-12 opacity-[0.03]">
          <Award size={200} className="text-accent" />
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
          <span className="text-[10px] font-black border border-accent/30 text-accent px-2 py-0.5 rounded tracking-widest uppercase">OFFLINE PROFILE</span>
        </div>

        <div className="mt-8">
          <div className="h-1.5 bg-glass rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${masterProgress}%` }}
              className="h-full bg-accent"
            ></motion.div>
          </div>
          <div className="text-[10px] font-bold text-dim mt-2 tracking-widest uppercase">Experience: {stats.experience.toLocaleString()} XP</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { label: lang === 'en' ? 'Shot Tasks' : 'শট টাস্ক', value: stats.shots, icon: Save, color: 'text-accent' },
          { label: t.profile.quizScores, value: `${stats.avgQuiz}%`, icon: Trophy, color: 'text-accent' },
          { label: t.profile.points, value: stats.points.toLocaleString(), icon: Star, color: 'text-accent' },
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

      <div className="immersive-card p-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-dim mb-4 ml-1">{t.profile.skillLevel}</h3>
        <div className="grid grid-cols-3 gap-2">
          {skillLevels.map(lvl => (
            <button
              key={lvl}
              onClick={() => setProfile(prev => ({ ...prev, skillLevel: lvl }))}
              className={`py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all border ${
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

      <button
        onClick={handleReset}
        className="w-full py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-red-500 hover:text-white transition-all"
      >
        {lang === 'en' ? 'Reset Offline System' : 'সিস্টেম রিসেট করুন'}
      </button>
    </div>
  );
};
