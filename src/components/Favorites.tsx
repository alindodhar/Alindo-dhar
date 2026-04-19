/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Star, Heart, ExternalLink, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';

interface FavoritesProps {
  lang: Language;
}

export const Favorites = ({ lang }: FavoritesProps) => {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('clicker_favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        setFavorites([]);
      }
    }
  }, []);

  const removeFavorite = (id: string | number) => {
    const updated = favorites.filter(fav => fav.id !== id);
    setFavorites(updated);
    localStorage.setItem('clicker_favorites', JSON.stringify(updated));
  };

  return (
    <div className="py-2 space-y-6 min-h-[500px]">
      <div className="flex justify-between items-center px-2">
        <h3 className="text-xl font-extrabold tracking-tight text-[var(--text)]">
          {lang === 'en' ? 'My Library' : 'আমার লাইব্রেরি'}
        </h3>
        <div className="flex items-center gap-2">
           <span className="text-[10px] font-black text-dim uppercase tracking-widest">{favorites.length} Items</span>
           <Star size={20} className="text-accent fill-accent/10" />
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {favorites.map((fav, idx) => (
            <motion.div
              key={fav.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: idx * 0.05 }}
              className="immersive-card p-5 flex items-center justify-between group hover:border-accent/30 bg-glass"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent-muted rounded-2xl text-accent group-hover:bg-accent group-hover:text-white transition-all shadow-sm">
                  <Heart size={18} fill="currentColor" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--text)]">{fav.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] font-black bg-glass border border-[var(--border)] text-dim px-2 py-0.5 rounded uppercase tracking-widest">
                       {fav.type}
                    </span>
                    <span className="text-[9px] font-bold text-dim italic opacity-50">{fav.date || 'Saved'}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => removeFavorite(fav.id)}
                  className="p-3 hover:bg-red-500/10 rounded-xl text-dim hover:text-red-500 transition-colors border border-transparent hover:border-red-500/20"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {favorites.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-32 flex flex-col items-center"
        >
          <div className="w-20 h-20 bg-accent-muted rounded-full flex items-center justify-center text-accent/20 mb-6 animate-pulse">
            <Heart size={40} />
          </div>
          <p className="text-sm font-bold text-dim mb-6 uppercase tracking-widest">
            {lang === 'en' ? 'Your creativity hub is empty' : 'আপনার লাইব্রেরি খালি'}
          </p>
          <button className="px-8 py-3 bg-accent text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-lg shadow-accent/20">
             {lang === 'en' ? 'Go Explore' : 'এক্সপ্লোর করুন'}
          </button>
        </motion.div>
      )}
    </div>
  );
};
