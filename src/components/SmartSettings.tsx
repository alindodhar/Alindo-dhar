/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, AlertTriangle, Aperture, Timer, Eye } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { lightingOptions, subjectOptions, motionOptions, calculateSettings } from '../data/settingsEngine';

interface SmartSettingsProps {
  lang: Language;
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section = ({ title, children }: SectionProps) => (
  <div className="space-y-3 mb-6">
    <h3 className="text-xs uppercase font-bold tracking-widest text-zinc-500 ml-1">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {children}
    </div>
  </div>
);

interface ChipProps {
  key?: string | number;
  active: boolean;
  onClick: () => void;
  label: string;
}

const Chip = ({ active, onClick, label }: ChipProps) => (
  <button
    onClick={onClick}
    className={`px-4 py-2.5 rounded-2xl text-xs font-semibold border transition-all active:scale-95 ${
      active 
        ? 'bg-accent border-accent text-white shadow-lg shadow-accent/20' 
        : 'bg-glass border-[var(--border)] text-dim hover:border-accent/30'
    }`}
  >
    {label}
  </button>
);

export const SmartSettings = ({ lang }: SmartSettingsProps) => {
  const [lighting, setLighting] = useState(lightingOptions(lang)[0].id);
  const [subject, setSubject] = useState(subjectOptions(lang)[0].id);
  const [motionLevel, setMotionLevel] = useState(motionOptions(lang)[0].id);
  const t = translations[lang];

  const result = calculateSettings(lighting, subject, motionLevel, lang);

  const getSimResult = () => {
    if (lighting.includes('dark')) return lang === 'en' ? 'Low light simulation active. High sensitivity mode enabled.' : 'অন্ধকারে শ্যুটিং মোড সক্রিয়। হাই সেনসিটিভিটি মোড চালু আছে।';
    if (motionLevel === 'fast') return lang === 'en' ? 'Motion capture simulation active. Freezing motion in progress.' : 'গতিশীল সাবজেক্ট মোড সক্রিয়। মোশন ফ্রিজ করার প্রস্তুতি চলছে।';
    return lang === 'en' ? 'Standard daylight simulation. Balanced exposure profile.' : 'সাধারণ দিনের আলোর সিমুলেশন। ব্যালেন্সড এক্সপোজার প্রোফাইল।';
  };

  return (
    <div className="py-2 space-y-6">
      <div className="immersive-card p-6 relative overflow-hidden group">
        <div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] bg-accent blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
        
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-xl font-extrabold tracking-tight text-[var(--text)]">{lang === 'en' ? 'Smart Settings Engine' : 'স্মার্ট সেটিংস ইঞ্জিন'}</h3>
            <p className="text-xs text-dim font-medium">{lang === 'en' ? 'Auto-calculating parameters for your environment' : 'পরিবেশ অনুযায়ী স্বয়ংক্রিয় গণনা'}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="text-[9px] font-black text-accent tracking-[0.2em] uppercase">SYSTEM: AI-DRIVEN</div>
            <div className="text-[8px] font-bold text-dim uppercase">Precision: 98.4%</div>
          </div>
        </div>

        <div className="space-y-6">
          <Section title={lang === 'en' ? 'Lighting Condition' : 'আলোর অবস্থা'}>
            {lightingOptions(lang).map(opt => (
              <Chip 
                key={opt.id} 
                active={lighting === opt.id} 
                onClick={() => setLighting(opt.id)} 
                label={opt.label} 
              />
            ))}
          </Section>

          <Section title={lang === 'en' ? 'Subject Type' : 'সাবজেক্ট'}>
            {subjectOptions(lang).map(opt => (
              <Chip 
                key={opt.id} 
                active={subject === opt.id} 
                onClick={() => setSubject(opt.id)} 
                label={opt.label} 
              />
            ))}
          </Section>

          <Section title={lang === 'en' ? 'Motion Level' : 'গতির স্তর'}>
            {motionOptions(lang).map(opt => (
              <Chip 
                key={opt.id} 
                active={motionLevel === opt.id} 
                onClick={() => setMotionLevel(opt.id)} 
                label={opt.label} 
              />
            ))}
          </Section>
        </div>

        <div className="mt-8 p-6 bg-glass border border-[var(--border)] rounded-[24px]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-accent/10 rounded-lg text-accent">
              <Eye size={16} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-dim">{lang === 'en' ? 'Visual Simulation' : 'ভিজ্যুয়াল সিমুলেশন'}</span>
          </div>
          <p className="text-sm font-medium leading-relaxed italic text-[var(--text)] mb-6">"{getSimResult()}"</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'ISO', value: result.iso, icon: Zap },
              { label: 'Shutter', value: result.shutter, icon: Timer },
              { label: 'Aperture', value: result.aperture, icon: Aperture },
              { label: 'WB', value: '5600K', icon: Eye },
            ].map((item, i) => (
              <div key={i} className="text-center p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-accent/20 transition-all group">
                <span className="text-lg font-mono font-bold text-accent block group-hover:scale-110 transition-transform">{item.value}</span>
                <span className="text-[9px] font-black text-dim uppercase tracking-widest mt-1 block">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {result.warning && (
          <div className="mt-6 p-4 bg-accent-muted rounded-2xl border border-accent/10 flex gap-3 items-start animate-in fade-in slide-in-from-bottom-2">
            <AlertTriangle className="text-accent shrink-0 w-4 h-4 mt-0.5" />
            <p className="text-[10px] font-bold text-accent/80 leading-relaxed uppercase tracking-widest">{result.warning}</p>
          </div>
        )}
      </div>
    </div>
  );
};
