/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BookOpen, HelpCircle, CheckCircle2, ChevronRight, Trophy, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { lessonsData, quizData } from '../data/learningLab';

interface LearningLabProps {
  lang: Language;
}

export const LearningLab = ({ lang }: LearningLabProps) => {
  const [activeTab, setActiveTab] = useState<'lessons' | 'quizzes'>('lessons');
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState<{ correct: number, total: number } | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [currentAnswers, setCurrentAnswers] = useState<number[]>([]);
  
  const lessons = lessonsData(lang);
  const quizzes = quizData(lang);

  const startQuiz = (id: string) => {
    setSelectedQuiz(id);
    setCurrentQuestionIdx(0);
    setCurrentAnswers([]);
    setQuizScore(null);
  };

  const handleAnswer = (optionIdx: number) => {
    const newAnswers = [...currentAnswers, optionIdx];
    setCurrentAnswers(newAnswers);
    
    if (currentQuestionIdx < quizzes.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      // Calculate score
      const correctCount = newAnswers.reduce((acc, ans, idx) => {
        return acc + (ans === quizzes[idx].correctAnswer ? 1 : 0);
      }, 0);
      
      const newScore = { correct: correctCount, total: quizzes.length };
      setQuizScore(newScore);
      
      // Persist score to global tracker
      const savedScores = localStorage.getItem('clicker_quiz_scores');
      const scores = savedScores ? JSON.parse(savedScores) : [];
      scores.push({
        id: selectedQuiz,
        timestamp: Date.now(),
        ...newScore
      });
      localStorage.setItem('clicker_quiz_scores', JSON.stringify(scores));
      
      setSelectedQuiz(null);
    }
  };

  return (
    <div className="py-2 h-full">
      {!selectedQuiz && (
        <div className="flex bg-[var(--surface)] p-1.5 border border-[var(--border)] rounded-2xl mb-8">
          <button
            onClick={() => { setActiveTab('lessons'); setQuizScore(null); }}
            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === 'lessons' ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'text-dim hover:text-[var(--text)]'
            }`}
          >
            {lang === 'en' ? 'Core Lessons' : 'পাঠসমূহ'}
          </button>
          <button
            onClick={() => { setActiveTab('quizzes'); setQuizScore(null); }}
            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === 'quizzes' ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'text-dim hover:text-[var(--text)]'
            }`}
          >
            {lang === 'en' ? 'Master Quizzes' : 'কুইজ'}
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {selectedQuiz ? (
          <motion.div
            key="quiz-runner"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="immersive-card p-8"
          >
            <div className="flex justify-between items-center mb-8">
              <span className="text-[10px] font-black text-accent uppercase tracking-widest">Question {currentQuestionIdx + 1}/{quizzes.length}</span>
              <button 
                onClick={() => setSelectedQuiz(null)}
                className="text-[9px] font-bold text-dim hover:text-red-500 uppercase tracking-widest"
              >
                {lang === 'en' ? 'Quit' : 'বাতিল'}
              </button>
            </div>
            
            <h3 className="text-xl font-extrabold text-[var(--text)] mb-8 leading-snug tracking-tight">
              {quizzes[currentQuestionIdx].question}
            </h3>

            <div className="space-y-3">
              {quizzes[currentQuestionIdx].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className="w-full p-5 text-left bg-glass border border-[var(--border)] rounded-2xl hover:border-accent hover:bg-accent/5 transition-all group flex items-center justify-between"
                >
                  <span className="text-sm font-semibold text-[var(--text)] group-hover:text-accent transition-colors">{option}</span>
                  <div className="w-6 h-6 rounded-full border border-[var(--border)] flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all">
                    <div className="w-2 h-2 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        ) : activeTab === 'lessons' ? (
          <motion.div
            key="lessons"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {lessons.map((lesson) => (
              <div key={lesson.id} className="immersive-card p-6 flex flex-col justify-between group h-full">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-accent bg-accent-muted px-2.5 py-1 rounded border border-accent/20">
                      {lesson.level}
                    </span>
                    <BookOpen size={16} className="text-dim opacity-30 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-lg font-extrabold text-[var(--text)] mb-3 leading-tight tracking-tight">{lesson.title}</h3>
                  <p className="text-[11px] text-dim leading-relaxed font-medium">{lesson.content}</p>
                </div>
                <div className="mt-8 flex items-center justify-between">
                   <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-accent hover:opacity-80 transition-all group-hover:translate-x-1">
                    {lang === 'en' ? 'Launch Lesson' : 'পাঠটি পড়ুন'}
                    <ChevronRight size={14} />
                  </button>
                  <div className="w-8 h-8 rounded-full bg-glass flex items-center justify-center border border-[var(--border)]">
                    <Star size={12} className="text-dim" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="quizzes"
            initial={{ opacity: 0, scale: 0.08 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            {quizScore && (
              <div className="immersive-card p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-accent blur-[100px] opacity-10"></div>
                <Trophy className="mx-auto text-accent mb-6" size={64} />
                <h2 className="text-3xl font-black text-[var(--text)] uppercase tracking-tight">{lang === 'en' ? 'Phase Complete!' : 'চমৎকার কাজ!'}</h2>
                <div className="text-[10px] font-black text-dim mt-2 uppercase tracking-[0.3em] mb-8">
                  {lang === 'en' ? `Verification Score: ${quizScore.correct}/${quizScore.total}` : `আপনার স্কোর ${quizScore.correct}/${quizScore.total}`}
                </div>
                <button 
                  onClick={() => setQuizScore(null)}
                  className="bg-accent text-white px-10 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-accent/30 hover:shadow-accent/40 transition-all active:scale-95"
                >
                  {lang === 'en' ? 'Next Challenge' : 'অন্যটি চেষ্টা করুন'}
                </button>
              </div>
            )}
            <div className="grid grid-cols-1 gap-3">
              {quizzes.map((quiz) => (
                <button 
                  key={quiz.id}
                  onClick={() => startQuiz(quiz.id)}
                  className="w-full immersive-card p-5 text-left flex items-center justify-between group hover:bg-glass"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 flex items-center justify-center bg-accent-muted rounded-2xl text-accent border border-accent/20 group-hover:bg-accent group-hover:text-white transition-all shadow-sm">
                      <HelpCircle size={22} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--text)] text-base group-hover:text-accent transition-colors">{quiz.id === 'iso' ? 'ISO Mastery Exam' : quiz.id === 'aperture' ? 'Aperture Control' : 'Shutter Intelligence'}</h3>
                      <p className="text-[9px] text-dim font-black uppercase tracking-[0.2em] mt-1">Verification Required • 5 Questions</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <span className="text-[9px] font-black text-dim opacity-0 group-hover:opacity-100 transition-opacity tracking-widest uppercase">Start</span>
                     <ChevronRight size={16} className="text-dim group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
