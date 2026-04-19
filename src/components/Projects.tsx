/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Folder, Plus, MoreVertical, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../types';

interface ProjectsProps {
  lang: Language;
}

export const Projects = ({ lang }: ProjectsProps) => {
  const projects = [
    { id: 1, title: lang === 'en' ? 'Golden Hour Portraits' : 'গোল্ডেন আওয়ার পোর্ট্রেটস', date: '2024-03-15', count: 12 },
    { id: 2, title: lang === 'en' ? 'Street Life Series' : 'স্ট্রিট লাইফ সিরিজ', date: '2024-03-10', count: 8 },
    { id: 3, title: lang === 'en' ? 'Macro Nature' : 'ম্যাক্রো নেচার', date: '2024-02-28', count: 24 },
  ];

  return (
    <div className="py-2 space-y-6">
      <div className="flex justify-between items-center px-2">
        <h3 className="text-xl font-extrabold tracking-tight">{lang === 'en' ? 'My Projects' : 'আমার প্রজেক্টস'}</h3>
        <button className="p-2 bg-accent text-white rounded-full hover:scale-110 active:scale-95 transition-all shadow-lg shadow-accent/20">
          <Plus size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="immersive-card p-5 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Folder size={80} className="text-accent" />
            </div>
            
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-accent-muted rounded-xl text-accent">
                <Folder size={20} />
              </div>
              <button className="text-dim hover:text-accent transition-colors">
                <MoreVertical size={18} />
              </button>
            </div>

            <h4 className="text-lg font-bold group-hover:text-accent transition-colors mb-1">{project.title}</h4>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-dim uppercase tracking-widest">
                <Calendar size={12} />
                {project.date}
              </div>
              <div className="px-2 py-0.5 bg-glass rounded text-[10px] font-black text-accent uppercase tracking-widest border border-accent/10">
                {project.count} {lang === 'en' ? 'Items' : 'আইটেম'}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-20 opacity-50">
          <Folder size={48} className="mx-auto mb-4 text-dim" />
          <p className="text-sm font-medium">{lang === 'en' ? 'No projects yet. Start creating!' : 'এখনো কোন প্রজেক্ট নেই। তৈরি করা শুরু করুন!'}</p>
        </div>
      )}
    </div>
  );
};
