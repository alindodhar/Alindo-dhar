/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Star, Heart, ExternalLink, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../types';

interface FavoritesProps {
  lang: Language;
}

export const Favorites = ({ lang }: FavoritesProps) => {
  const favorites = [
    { id: 1, title: lang === 'en' ? 'Portrait Photography 101' : 'পোর্ট্রেট ফটোগ্রাফি ১০১', type: 'Lesson' },
    { id: 2, title: lang === 'en' ? 'Cinematic Frame Rates' : 'সিনেমাটিক ফ্রেম রেট', type: 'Guide' },
    { id: 3, title: lang === 'en' ? 'Rule of Thirds' : 'রুল অফ থার্ডস', type: 'Tool' },
  ];

  return (
    <div className="py-2 space-y-6">
      <div className="flex justify-between items-center px-2">
        <h3 className="text-xl font-extrabold tracking-tight">{lang === 'en' ? 'My Favorites' : 'আমার ফেভারিটস'}</h3>
        <Star size={20} className="text-accent animate-pulse" />
      </div>

      <div className="space-y-3">
        {favorites.map((fav, idx) => (
          <motion.div
            key={fav.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="immersive-card p-4 flex items-center justify-between group hover:border-accent/30"
          >
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-accent-muted rounded-xl text-accent group-hover:bg-accent group-hover:text-white transition-all">
                <Heart size={18} fill={idx === 0 ? "currentColor" : "none"} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[var(--text)]">{fav.title}</h4>
                <div className="text-[9px] font-black text-dim uppercase tracking-widest mt-0.5">{fav.type}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 hover:bg-glass rounded-lg text-dim hover:text-accent transition-colors">
                <ExternalLink size={16} />
              </button>
              <button className="p-2 hover:bg-red-500/10 rounded-lg text-dim hover:text-red-500 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {favorites.length === 0 && (
        <div className="text-center py-20 opacity-50">
          <Star size={48} className="mx-auto mb-4 text-dim" />
          <p className="text-sm font-medium">{lang === 'en' ? 'Nothing saved yet.' : 'এখনো কিছু সেভ করা হয়নি।'}</p>
        </div>
      )}
    </div>
  );
};
