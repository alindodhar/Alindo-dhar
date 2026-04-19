import React, { useState } from 'react';
import { Video, Film, Camera, Move, Wind, CheckCircle, AlertCircle, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface VideographyBrainProps {
  lang: Language;
}

const categories = [
  { id: 'cinematic', name: 'Cinematic', icon: Film, bg: 'bg-accent' },
  { id: 'vlog', name: 'Vlog / Personal', icon: Video, bg: 'bg-accent' },
  { id: 'travel', name: 'Travel / Nature', icon: Camera, bg: 'bg-accent' },
  { id: 'slowmo', name: 'Slow Motion', icon: Wind, bg: 'bg-accent' },
];

const videoDetails: any = {
  cinematic: {
    settings: { fps: '24 fps', shutter: '1/48', exposure: 'ND Filter Req.', movement: 'Gimbal / Slider' },
    tips: [
      { title: 'Golden Ratio', description: 'Use shallow depth of field for focus.' },
      { title: 'Color Grade', description: 'Shoot in Log profile for maximum range.' }
    ],
    mistakes: ['Fast panning', 'Auto focus hunting', 'High shutter speeds']
  },
  vlog: {
    settings: { fps: '30 / 60 fps', shutter: '1/60+', exposure: 'Auto ISO', movement: 'Handheld / Selfie' },
    tips: [
      { title: 'Audio First', description: 'Always use an external microphone.' },
      { title: 'Eye Level', description: 'Maintain eye contact with the lens.' }
    ],
    mistakes: ['Ignoring audio', 'Bad lighting', 'No story structure']
  },
  travel: {
    settings: { fps: '24 / 60 fps', shutter: '1/50+', exposure: 'High dynamic range', movement: 'Drone / Handheld' },
    tips: [
      { title: 'Golden Hour', description: 'Shoot early morning or late afternoon.' },
      { title: 'B-Roll', description: 'Capture environment details for transitions.' }
    ],
    mistakes: ['Over-saturation', 'Shaky footage', 'Lack of narrative']
  },
  slowmo: {
    settings: { fps: '120 / 240 fps', shutter: '1/250+', exposure: 'Bright light required', movement: 'Static / Smooth' },
    tips: [
      { title: 'Light Quality', description: 'High FPS requires significant lighting.' },
      { title: 'Calculated Action', description: 'Time the peak of action for slow-mo.' }
    ],
    mistakes: ['Dim footage', 'Flickering lights', 'Empty movement']
  }
};

export const VideographyBrain = ({ lang }: VideographyBrainProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const t = translations[lang];
  const activeDetails = selectedId ? videoDetails[selectedId] : null;

  return (
    <div className="py-2 space-y-6">
      <AnimatePresence mode="wait">
        {!selectedId ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {categories.map((cat, idx) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedId(cat.id)}
                className="immersive-card p-6 flex flex-col items-center justify-center gap-4 text-center group transition-all h-[180px]"
              >
                <div className="p-4 bg-accent-muted text-accent rounded-full group-hover:bg-accent group-hover:text-white transition-all shadow-sm">
                  <cat.icon size={32} />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xl font-extrabold tracking-tight text-[var(--text)]">{cat.name}</span>
                  <span className="text-[10px] font-black uppercase text-accent tracking-[0.2em] mt-1">Video Module</span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="details"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setSelectedId(null)}
                className="text-accent bg-accent-muted px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-accent/20 hover:border-accent transition-all"
              >
                ← Back
              </button>
              <div className="h-[1px] flex-1 bg-[var(--border)]"></div>
            </div>

            <div className="immersive-card p-8 border-accent/20 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-5">
                 <PlayCircle size={140} className="text-accent" />
               </div>
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-8 flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
                 Cinema Parameters
               </h3>
               
               <div className="grid grid-cols-2 gap-4">
                 {Object.entries(activeDetails.settings).map(([label, val]: any) => (
                   <div key={label} className="bg-glass p-4 rounded-2xl border border-[var(--border)] hover:border-accent/20 transition-all">
                      <span className="text-[9px] font-black uppercase tracking-widest text-dim block mb-1">{label}</span>
                      <span className="text-xl font-mono font-bold text-accent">{val}</span>
                   </div>
                 ))}
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-dim ml-2 flex items-center gap-2">
                    <CheckCircle size={14} className="text-emerald-500" />
                    Techniques
                  </h3>
                  {activeDetails.tips.map((tip: any, i: number) => (
                    <div key={i} className="immersive-card p-5 group hover:border-accent/30">
                       <h4 className="font-bold text-accent text-sm mb-1">{tip.title}</h4>
                       <p className="text-[11px] text-dim leading-relaxed">{tip.description}</p>
                    </div>
                  ))}
               </div>
               
               <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-dim ml-2 flex items-center gap-2">
                    <AlertCircle size={14} className="text-red-500" />
                    Common Errors
                  </h3>
                  <div className="immersive-card p-6 bg-red-500/5 border-red-500/10">
                    <div className="space-y-4">
                      {activeDetails.mistakes.map((m: string, i: number) => (
                        <div key={i} className="text-[11px] font-medium text-dim flex gap-3 italic">
                           <div className="w-1 h-1 rounded-full bg-red-500/50 mt-2 shrink-0"></div>
                           {m}
                        </div>
                      ))}
                    </div>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
