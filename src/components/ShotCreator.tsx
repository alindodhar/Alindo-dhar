/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Plus, Camera, Video, List, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../types';

export const ShotCreator = ({ lang }: { lang: Language }) => {
  const [type, setType] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<string, string[]>>(() => {
    const saved = localStorage.getItem('clicker_shot_progress');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('clicker_shot_progress', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const categories = [
    { id: 'wedding', label: lang === 'en' ? 'Wedding' : 'বিবাহ', icon: Camera },
    { id: 'travel', label: lang === 'en' ? 'Travel' : 'ভ্রমণ', icon: Video },
    { id: 'youtube', label: lang === 'en' ? 'YouTube' : 'ইউটিউব', icon: List },
    { id: 'reel', label: lang === 'en' ? 'Reels / Short' : 'রিলস / শর্ট', icon: Plus },
  ];

  const shotLists: Record<string, string[]> = {
    wedding: [
      lang === 'en' ? 'Ring close-up' : 'আংটির ক্লোজ-আপ',
      lang === 'en' ? 'Bride/Groom entry' : 'বরের/কনের প্রবেশ',
      lang === 'en' ? 'Candid family reaction' : 'পরিবারের স্বাভাবিক প্রতিক্রিয়া',
      lang === 'en' ? 'Decor details' : 'সাজসজ্জার বিবরণ',
    ],
    travel: [
      lang === 'en' ? 'Point of interest wide' : 'দর্শনীয় স্থানের ওয়াইড শট',
      lang === 'en' ? 'Local food detail' : 'স্থানীয় খাবারের বিবরণ',
      lang === 'en' ? 'Walking transit shot' : 'হাঁটাচলার ট্রানজিট শট',
      lang === 'en' ? 'Sunset landscape' : 'সূর্যাস্তের ল্যান্ডস্কেপ',
    ],
    youtube: [
      lang === 'en' ? 'A-Roll (Talking Head)' : 'এ-রোল (কথা বলা)',
      lang === 'en' ? 'B-Roll (Supporting visual)' : 'বি-রোল (সাপোর্টিং ইন্টারভিউ)',
      lang === 'en' ? 'Product showcase' : 'প্রোডাক্ট শোকেস',
      lang === 'en' ? 'Outro / CTA' : 'আউটরো / ভিডিওর শেষ',
    ],
    reel: [
      lang === 'en' ? 'Hook shot (First 3s)' : 'হুক শট (প্রথম ৩ সেকেন্ড)',
      lang === 'en' ? 'Fast transition 1' : 'দ্রুত ট্রানজিশন ১',
      lang === 'en' ? 'The Reveal' : 'দ্য রিভিল',
      lang === 'en' ? 'Call to action' : 'কল টু অ্যাকশন',
    ]
  };

  const toggleShot = (shot: string) => {
    if (!type) return;
    const current = checkedItems[type] || [];
    const updated = current.includes(shot)
      ? current.filter(s => s !== shot)
      : [...current, shot];
    
    setCheckedItems(prev => ({ ...prev, [type]: updated }));
  };

  const progress = type ? (checkedItems[type]?.length || 0) / (shotLists[type]?.length || 1) * 100 : 0;

  return (
    <div className="py-2 space-y-6 h-full">
      {!type ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setType(cat.id)}
              className="immersive-card p-8 flex flex-col items-center justify-center gap-5 transition-all text-center group"
            >
              <div className="p-4 bg-accent-muted text-accent rounded-2xl group-hover:bg-accent group-hover:text-white transition-all shadow-sm">
                <cat.icon size={28} />
              </div>
              <span className="font-bold text-[10px] uppercase tracking-[0.2em] text-dim group-hover:text-accent transition-colors">{cat.label}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
             <button onClick={() => setType(null)} className="text-accent text-[9px] font-black uppercase tracking-[0.2em] bg-accent-muted px-4 py-2 rounded-xl border border-accent/20 hover:border-accent transition-all">
              ← {lang === 'en' ? 'Back' : 'পিছনে'}
            </button>
            <div className="flex items-center gap-3">
              <div className="h-1 bg-accent/20 w-24 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-accent" />
              </div>
              <span className="text-[10px] font-black text-dim">{Math.round(progress)}%</span>
            </div>
          </div>
          
          <div className="immersive-card p-8 border-accent/20">
             <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-xl font-extrabold text-[var(--text)] tracking-tight">
                  {categories.find(c => c.id === type)?.label} {lang === 'en' ? 'Production List' : 'শট লিস্ট'}
                </h3>
                <p className="text-[10px] font-bold text-dim uppercase tracking-widest mt-1">Status: {progress === 100 ? 'Completed' : 'Planning Stage'}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-accent-muted flex items-center justify-center border border-accent/20">
                <Check size={18} className="text-accent" />
              </div>
            </div>

            <div className="space-y-3">
              {shotLists[type].map((shot, i) => {
                const isChecked = checkedItems[type]?.includes(shot);
                return (
                  <button 
                    key={i} 
                    onClick={() => toggleShot(shot)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left group ${
                      isChecked ? 'bg-accent/10 border-accent/30' : 'bg-glass border-[var(--border)] hover:border-accent/30'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                      isChecked ? 'bg-accent border-accent' : 'border-[var(--border)] group-hover:border-accent'
                    }`}>
                      <Check size={12} className={`text-white transition-opacity ${isChecked ? 'opacity-100' : 'opacity-0'}`} />
                    </div>
                    <span className={`text-sm font-semibold transition-colors ${
                      isChecked ? 'text-accent line-through opacity-60' : 'text-[var(--text)]'
                    }`}>
                      {shot}
                    </span>
                  </button>
                );
              })}
            </div>

            <button className="w-full mt-8 py-4 bg-accent text-white rounded-xl text-[10px] font-black uppercase tracking-[0.3em] shadow-lg shadow-accent/20 hover:shadow-accent/40 active:scale-95 transition-all">
               {lang === 'en' ? 'Export Production Guide' : 'গাইড এক্সপোর্ট করুন'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
