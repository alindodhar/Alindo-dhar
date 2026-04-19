import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Book, Layout, Maximize, Scissors, Grid, Focus, Sun, Layers, Ruler } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface ToolsGuidesProps {
  lang: Language;
}

const guides = [
  { id: 'ruleOfThirds', icon: Grid, title: { en: 'Rule of Thirds', bn: 'রুল অফ থার্ডস' }, description: { en: 'Place subjects along grid lines for balance.', bn: 'ভারসাম্যের জন্য গ্রিড লাইন বরাবর সাবজেক্ট রাখুন।' } },
  { id: 'composition', icon: Layout, title: { en: 'Composition Basics', bn: 'কম্পোজিশন বেসিকস' }, description: { en: 'Framing, leading lines, and symmetry.', bn: 'ফ্রেমিং, লিডিং লাইন এবং সিমেট্রি।' } },
  { id: 'lighting', icon: Sun, title: { en: 'Natural Lighting', bn: 'প্রাকৃতিক আলো' }, description: { en: 'Using the golden hour and shadows.', bn: 'গোল্ডেন আওয়ার এবং ছায়া ব্যবহার।' } },
  { id: 'depth', icon: Layers, title: { en: 'Depth of Field', bn: 'ডেপথ অফ ফিল্ড' }, description: { en: 'Controlling background blur (Bokeh).', bn: 'ব্যাকগ্রাউন্ড ব্লার (বোকেহ) নিয়ন্ত্রণ।' } },
  { id: 'exposure', icon: Maximize, title: { en: 'Exposure Triangle', bn: 'এক্সপোজার ট্রায়াঙ্গেল' }, description: { en: 'ISO, Shutter, and Aperture harmony.', bn: 'ISO, শাটার এবং অ্যাপারচার সামঞ্জস্য।' } },
  { id: 'framing', icon: Scissors, title: { en: 'Smart Framing', bn: 'স্মার্ট ফ্রেমিং' }, description: { en: 'Using natural elements to frame subjects.', bn: 'সাবজেক্ট ফ্রেম করতে প্রাকৃতিক উপাদান ব্যবহার।' } },
];

export const ToolsGuides = ({ lang }: ToolsGuidesProps) => {
  const t = translations[lang];
  const [activeGuide, setActiveGuide] = useState<string | null>(null);

  return (
    <div className="py-2 space-y-6">
      {!activeGuide ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guides.map((guide, idx) => (
            <motion.button
              key={guide.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setActiveGuide(guide.id)}
              className="immersive-card p-6 flex items-start gap-4 transition-all hover:bg-glass group text-left"
            >
              <div className="p-3.5 bg-accent-muted text-accent rounded-2xl group-hover:bg-accent group-hover:text-white transition-all">
                <guide.icon size={24} />
              </div>
              <div>
                <h3 className="text-base font-bold text-[var(--text)] group-hover:text-accent transition-colors">
                  {lang === 'en' ? guide.title.en : guide.title.bn}
                </h3>
                <p className="text-[11px] text-dim font-medium leading-relaxed mt-1">
                  {lang === 'en' ? guide.description.en : guide.description.bn}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="immersive-card p-8 min-h-[400px] flex flex-col"
        >
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => setActiveGuide(null)}
              className="text-[10px] font-black uppercase tracking-widest text-accent bg-accent-muted px-4 py-2 rounded-xl border border-accent/20 hover:border-accent transition-all"
            >
              ← Back
            </button>
            <div className="text-[10px] font-black text-dim uppercase tracking-widest">Master Guide v2.0</div>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center text-center max-w-lg mx-auto">
             <div className="w-20 h-20 bg-accent-muted rounded-full flex items-center justify-center text-accent mb-6 border border-accent/20">
                {React.createElement(guides.find(g => g.id === activeGuide)?.icon || Book, { size: 32 })}
             </div>
             <h2 className="text-2xl font-extrabold tracking-tight text-[var(--text)] mb-4 italic">
                {lang === 'en' ? guides.find(g => g.id === activeGuide)?.title.en : guides.find(g => g.id === activeGuide)?.title.bn}
             </h2>
             <p className="text-sm text-dim leading-loose font-medium opacity-80">
                {lang === 'en' 
                  ? 'Detailed offline interactive guide content is loading... This module provides master-level techniques for ' + activeGuide?.replace(/([A-Z])/g, ' $1').toLowerCase() + ' using professional visual aids.' 
                  : 'বিস্তারিত অফলাইন ইন্টারেক্টিভ গাইড কন্টেন্ট লোড হচ্ছে... এই মডিউলটি পেশাদার ভিজ্যুয়াল এইড ব্যবহার করে মাস্টারি লেভেলের টেকনিক প্রদান করে।'}
             </p>
             
             <div className="grid grid-cols-2 gap-3 w-full mt-12">
                <div className="p-4 bg-glass border border-[var(--border)] rounded-2xl">
                   <Ruler size={16} className="text-accent mb-2 mx-auto" />
                   <div className="text-[9px] font-black uppercase tracking-widest text-dim">Precision</div>
                </div>
                <div className="p-4 bg-glass border border-[var(--border)] rounded-2xl">
                   <Focus size={16} className="text-accent mb-2 mx-auto" />
                   <div className="text-[9px] font-black uppercase tracking-widest text-dim">Clarity</div>
                </div>
             </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
