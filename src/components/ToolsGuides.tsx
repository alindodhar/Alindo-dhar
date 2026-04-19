import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Book, Layout, Maximize, Scissors, Grid, Focus, Sun, Layers, Ruler } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface ToolsGuidesProps {
  lang: Language;
}

const guides = [
  { id: 'storage', icon: Maximize, title: { en: 'Storage Required', bn: 'মেমরি ক্যালকুলেটর' }, description: { en: 'Calculate SD card space for 4K video.', bn: '৪কে ভিডিওর জন্য মেমরি কার্ডের স্পেস হিসাব করুন।' } },
  { id: 'ruleOfThirds', icon: Grid, title: { en: 'Rule of Thirds', bn: 'রুল অফ থার্ডস' }, description: { en: 'Place subjects along grid lines for balance.', bn: 'ভারসাম্যের জন্য গ্রিড লাইন বরাবর সাবজেক্ট রাখুন।' } },
  { id: 'composition', icon: Layout, title: { en: 'Composition Basics', bn: 'কম্পোজিশন বেসিকস' }, description: { en: 'Framing, leading lines, and symmetry.', bn: 'ফ্রেমিং, লিডিং লাইন এবং সিমেট্রি।' } },
  { id: 'lighting', icon: Sun, title: { en: 'Natural Lighting', bn: 'প্রাকৃতিক আলো' }, description: { en: 'Using the golden hour and shadows.', bn: 'গোল্ডেন আওয়ার এবং ছায়া ব্যবহার।' } },
];

export const ToolsGuides = ({ lang }: ToolsGuidesProps) => {
  const t = translations[lang];
  const [activeGuide, setActiveGuide] = useState<string | null>(null);
  const [gbNeeded, setGbNeeded] = useState<number | null>(null);
  const [res, setRes] = useState('4k');
  const [fps, setFps] = useState('60');
  const [mins, setMins] = useState(10);

  const calculateStorage = () => {
    // Basic estimation: 4K 60fps ~ 1GB/min, 4K 24fps ~ 500MB/min, 1080p ~ 200MB/min
    let rate = 0.5;
    if (res === '4k') rate = fps === '60' ? 1.2 : 0.7;
    else rate = 0.3;
    setGbNeeded(parseFloat((rate * mins).toFixed(2)));
  };

  const renderTool = () => {
    if (activeGuide === 'storage') {
      return (
        <div className="space-y-8 w-full">
           <div className="text-center">
              <h2 className="text-2xl font-extrabold tracking-tight text-[var(--text)] italic">{lang === 'en' ? 'Data Usage Calculator' : 'ডেটা ব্যবহার ক্যালকুলেটর'}</h2>
              <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em] mt-2">SD Card Mapping Engine</p>
           </div>

           <div className="space-y-6 bg-glass p-8 rounded-3xl border border-[var(--border)]">
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-dim ml-2">{lang === 'en' ? 'Resolution' : 'রেজোলিউশন'}</label>
                    <select value={res} onChange={(e) => setRes(e.target.value)} className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-xl p-3 text-xs font-bold outline-none text-accent">
                       <option value="4k">4K Ultra HD</option>
                       <option value="1080p">1080p Full HD</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-dim ml-2">{lang === 'en' ? 'Frame Rate' : 'ফ্রেম রেট'}</label>
                    <select value={fps} onChange={(e) => setFps(e.target.value)} className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-xl p-3 text-xs font-bold outline-none text-accent">
                       <option value="24">24 fps (Cinema)</option>
                       <option value="30">30 fps (Standard)</option>
                       <option value="60">60 fps (Smooth)</option>
                    </select>
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-dim ml-2">{lang === 'en' ? 'Duration (Minutes)' : 'সময়কাল (মিনিট)'}</label>
                 <input 
                    type="range" min="1" max="120" value={mins} 
                    onChange={(e) => setMins(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-accent/20 rounded-lg appearance-none cursor-pointer accent-accent" 
                  />
                  <div className="flex justify-between text-[10px] font-bold text-dim uppercase">
                     <span>1 Min</span>
                     <span className="text-accent text-xs">{mins} Mins</span>
                     <span>120 Mins</span>
                  </div>
              </div>

              <button 
                onClick={calculateStorage}
                className="w-full py-4 bg-accent text-white rounded-xl text-[10px] font-black uppercase tracking-[0.3em] shadow-lg shadow-accent/20 active:scale-95 transition-all"
              >
                {lang === 'en' ? 'Run Calculation' : 'গণনা করুন'}
              </button>

              {gbNeeded !== null && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 bg-accent-muted border border-accent/20 rounded-2xl text-center"
                >
                   <div className="text-4xl font-mono font-black text-accent">{gbNeeded} GB</div>
                   <div className="text-[9px] font-black text-dim uppercase tracking-[0.2em] mt-2 italic">
                      {lang === 'en' ? 'Estimated storage required for your shoot' : 'আপনার শ্যুটের জন্য আনুমানিক মেমরি প্রয়োজন'}
                   </div>
                </motion.div>
              )}
           </div>
        </div>
      );
    }

    return (
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
    );
  };

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
              onClick={() => { setActiveGuide(null); setGbNeeded(null); }}
              className="text-[10px] font-black uppercase tracking-widest text-accent bg-accent-muted px-4 py-2 rounded-xl border border-accent/20 hover:border-accent transition-all"
            >
              ← Back
            </button>
            <div className="text-[10px] font-black text-dim uppercase tracking-widest">Master Tool v2.1</div>
          </div>
          
          {renderTool()}
        </motion.div>
      )}
    </div>
  );
};
