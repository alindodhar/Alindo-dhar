/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Folder, Plus, Trash2, Calendar, Layout } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';

interface ProjectsProps {
  lang: Language;
}

export const Projects = ({ lang }: ProjectsProps) => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('clicker_projects');
    if (saved) {
      try {
        setProjects(JSON.parse(saved));
      } catch (e) {
        setProjects([]);
      }
    }
  }, []);

  const deleteProject = (id: string | number) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    localStorage.setItem('clicker_projects', JSON.stringify(updated));
  };

  return (
    <div className="py-2 space-y-6 min-h-[500px]">
      <div className="flex justify-between items-center px-2">
        <h3 className="text-xl font-extrabold tracking-tight text-[var(--text)]">
          {lang === 'en' ? 'My Projects' : 'আমার প্রজেক্টস'}
        </h3>
        <button className="p-3 bg-accent text-white rounded-full hover:scale-110 active:scale-95 transition-all shadow-lg shadow-accent/20">
          <Plus size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.1 }}
              className="immersive-card p-6 group relative overflow-hidden bg-glass"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Folder size={100} className="text-accent" />
              </div>
              
              <div className="flex justify-between items-start mb-6">
                <div className="p-3.5 bg-accent-muted rounded-2xl text-accent shadow-sm group-hover:bg-accent group-hover:text-white transition-all">
                  <Layout size={20} />
                </div>
                <button 
                  onClick={() => deleteProject(project.id)}
                  className="p-2 text-dim hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <h4 className="text-lg font-bold group-hover:text-accent transition-colors mb-2 tracking-tight">
                {project.title}
              </h4>
              
              <div className="flex items-center gap-4 mt-6">
                <div className="flex items-center gap-2 text-[10px] font-black text-dim uppercase tracking-widest bg-glass px-3 py-1.5 rounded-lg border border-[var(--border)]">
                  <Calendar size={12} className="text-accent" />
                  {project.date}
                </div>
                <div className="px-3 py-1.5 bg-accent/10 rounded-lg text-[10px] font-black text-accent uppercase tracking-widest border border-accent/20">
                  {project.count} {lang === 'en' ? 'Shots' : 'শট'}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {projects.length === 0 && (
        <div className="text-center py-32 flex flex-col items-center">
          <div className="w-20 h-20 bg-accent-muted rounded-full flex items-center justify-center text-accent/20 mb-6">
            <Folder size={40} />
          </div>
          <p className="text-sm font-bold text-dim uppercase tracking-widest max-w-[200px]">
            {lang === 'en' ? 'You haven\'t archived any productions yet.' : 'আপনি এখনো কোনো উৎপাদন আর্কাইভ করেননি।'}
          </p>
        </div>
      )}
    </div>
  );
};
