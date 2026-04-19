/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mountain, Moon, Camera as CameraIcon, Package, CheckCircle, AlertCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { photoCategories, photoDetails } from '../data/photographyData';

interface PhotographyBrainProps {
  lang: Language;
}

const icons: Record<string, any> = {
  User, Mountain, Moon, Camera: CameraIcon, Package
};

export const PhotographyBrain = ({ lang }: PhotographyBrainProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const t = translations[lang];
  const categories = photoCategories(lang);

  const activeDetails = selectedId ? photoDetails[selectedId]?.[lang] : null;

  return (
    <div className="p-4 mt-16 pb-24 h-full">
      {!selectedId ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {categories.map((cat, idx) => {
            const Icon = icons[cat.icon];
            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedId(cat.id)}
                className="immersive-card flex items-center gap-4 p-5 transition-all text-left group"
              >
                <div className="p-3 rounded-xl bg-accent-muted text-accent group-hover:bg-accent group-hover:text-white transition-all shadow-[0_0_10px_transparent] group-hover:shadow-accent/20">
                  <Icon size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-[var(--text)]">{cat.name}</span>
                  <span className="text-[10px] font-bold text-dim uppercase tracking-widest">{lang === 'en' ? 'Techniques' : 'কৌশলসমূহ'}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSelectedId(null)}
              className="text-[10px] font-black uppercase tracking-widest text-accent bg-accent-muted px-4 py-2 rounded-xl border border-accent/20 hover:border-accent transition-all"
            >
              ← {lang === 'en' ? 'Back' : 'পিছনে'}
            </button>
            <div className="h-[1px] flex-1 bg-[var(--border)]"></div>
          </div>

          <div className="immersive-card p-6 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-10 opacity-5">
              {icons[categories.find(c => c.id === selectedId)?.icon || 'Camera'] && 
                React.createElement(icons[categories.find(c => c.id === selectedId)?.icon || 'Camera'], { size: 120 })
              }
            </div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-dim mb-6 flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
               {lang === 'en' ? 'Calculated Parameters' : 'গণনাকৃত প্যারামিটার'}
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              {activeDetails && Object.entries(activeDetails.settings).map(([key, val]: [string, any]) => (
                <div key={key} className="bg-glass p-4 rounded-xl border border-[var(--border)] flex flex-col gap-1 hover:border-accent/20 transition-all">
                  <span className="text-[10px] font-black uppercase text-dim">
                    {t.settings[key as keyof typeof t.settings] || key}
                  </span>
                  <span className="text-xl font-mono font-bold text-accent">{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-dim ml-2 flex items-center gap-2">
              <CheckCircle size={14} className="text-accent" />
              {t.settings.tips}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeDetails?.tips.map((tip: any, i: number) => (
                <div key={i} className="immersive-card border-accent/10 p-5 group hover:border-accent/30">
                  <h4 className="font-bold text-accent text-sm mb-1">{tip.title}</h4>
                  <p className="text-[11px] text-dim leading-relaxed">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-dim ml-2 flex items-center gap-2">
              <AlertCircle size={14} className="text-red-500" />
              {t.settings.mistakes}
            </h3>
            <div className="immersive-card bg-red-500/5 border-red-500/10 p-6">
              <div className="space-y-3">
                {activeDetails?.mistakes.map((mistake: string, i: number) => (
                  <div key={i} className="flex gap-3 items-start text-[11px] font-medium text-dim">
                    <div className="w-1 h-1 rounded-full bg-red-500/50 mt-1.5 shrink-0"></div>
                    {mistake}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
