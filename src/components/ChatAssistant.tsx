/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { Send, User as UserIcon, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, ChatMessage } from '../types';
import { translations } from '../i18n/translations';
import { chatKeywordData } from '../data/photographyData';

interface ChatAssistantProps {
  lang: Language;
}

export const ChatAssistant = ({ lang }: ChatAssistantProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeContext, setActiveContext] = useState<string | null>(null);
  const t = translations[lang];
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('clicker_chat_history');
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      const greetings = t.chat.greetings;
      const randomGreet = greetings[Math.floor(Math.random() * greetings.length)];
      setMessages([{
        id: 'greet',
        role: 'assistant',
        content: randomGreet,
        timestamp: Date.now()
      }]);
    }
  }, [lang]);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('clicker_chat_history', JSON.stringify(messages));
      
      // Update context from last few user messages
      const userQueries = messages
        .filter(m => m.role === 'user')
        .slice(-3)
        .map(m => m.content.toLowerCase());
      
      const topics = ['portrait', 'landscape', 'iso', 'night', 'shutter', 'cinematic', 'aperture'];
      const foundContext = topics.find(topic => userQueries.some(q => q.includes(topic)));
      if (foundContext) setActiveContext(foundContext);
    }
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(inputText);
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const generateResponse = (input: string) => {
    const data = chatKeywordData(lang);
    const lowercaseInput = input.toLowerCase();
    
    const match = data.find(item => 
      item.keywords.some(kw => lowercaseInput.includes(kw))
    );

    let prefix = '';
    if (activeContext && !lowercaseInput.includes(activeContext)) {
      prefix = lang === 'en' 
        ? `Since we were discussing ${activeContext}, here's how this relates: ` 
        : `যেহেতু আমরা ${activeContext} সম্পর্কে কথা বলছিলাম, তার সাথে এটি এভাবে যুক্ত: `;
    }

    if (match) {
      const res = match.responses[0];
      return `${prefix}${res.opening}\n\n${res.answer}\n\n${res.explanation}\n\nSuggestion: ${res.suggestion}\n\n${res.followUp}`;
    }

    if (lowercaseInput.includes('clear') || lowercaseInput.includes('reset')) {
      setTimeout(() => {
        setMessages([]);
        localStorage.removeItem('clicker_chat_history');
        setActiveContext(null);
      }, 500);
      return lang === 'en' ? 'Cleaning up history... All clear!' : 'হিস্ট্রি মুছে ফেলা হচ্ছে... সব পরিষ্কার!';
    }

    return t.chat.fallback;
  };

  const getSuggestions = () => {
    if (!activeContext) return lang === 'en' ? ['What is ISO?', 'Aperture guide', 'Composition tips'] : ['ISO কি?', 'অ্যাপারচার গাইড', 'কম্পোজিশন টিপস'];
    
    const contextMap: Record<string, string[]> = {
      iso: lang === 'en' ? ['Shutter speed?', 'Avoid noise', 'Auto ISO'] : ['শাটার স্পিড?', 'নয়েজ কমানো', 'অটো আইএসও'],
      aperture: lang === 'en' ? ['What is Bokeh?', 'Portrait f-stop', 'Landscape f-stop'] : ['বোকেহ কি?', 'পোর্ট্রেট অ্যাপারচার', 'ল্যান্ডস্কেপ অ্যাপারচার'],
      portrait: lang === 'en' ? ['Lighting tips', 'Pose ideas', 'Best lenses'] : ['লাইটিং টিপস', 'পোজ আইডিয়া', 'সেরা লেন্স'],
      landscape: lang === 'en' ? ['Focus stack', 'Tripod tips', 'Filters'] : ['ফোকাস স্ট্যাক', 'ট্রাইপড টিপস', 'ফিল্টার'],
      shutter: lang === 'en' ? ['Long exposure', 'Freeze action', 'Motion blur'] : ['লং এক্সপোজার', 'ফ্রেম ফ্রিজ', 'মোশন ব্লার'],
    };

    return contextMap[activeContext] || (lang === 'en' ? ['Photography basics', 'Video tips'] : ['ফটোগ্রাফি বেসিকস', 'ভিডিও টিপস']);
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('clicker_chat_history');
    setActiveContext(null);
  };

  return (
    <div className="flex flex-col h-full bg-[var(--surface)] border border-[var(--border)] rounded-[24px] overflow-hidden shadow-sm transition-colors duration-300">
      <div className="px-6 py-4 border-b border-[var(--border)] bg-glass flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)] animate-pulse"></div>
          <div className="flex flex-col">
            <span className="font-extrabold text-[11px] uppercase tracking-widest text-[var(--text)]">Core Intelligence</span>
            <span className="text-[9px] font-bold text-dim uppercase tracking-widest">Assistant Online</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <button onClick={clearChat} className="p-2 text-dim hover:text-red-500 transition-colors">
              <span className="text-[9px] font-black uppercase tracking-widest">Clear</span>
           </button>
           <Bot size={18} className="text-accent opacity-50" />
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`p-4 rounded-2xl whitespace-pre-wrap leading-relaxed max-w-[90%] text-xs font-medium shadow-sm border ${
                msg.role === 'user' 
                  ? 'bg-accent text-white border-accent rounded-tr-none' 
                  : 'bg-glass text-[var(--text)] border-[var(--border)] rounded-tl-none'
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-glass border border-[var(--border)] px-4 py-3 rounded-2xl flex gap-1.5">
                <span className="w-1 h-1 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1 h-1 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1 h-1 bg-accent rounded-full animate-bounce"></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-4 border-t border-[var(--border)] bg-[var(--surface)] space-y-4">
        {/* Suggestion Chips */}
        <div className="flex flex-wrap gap-2 px-1">
          {getSuggestions().map((s, i) => (
            <button
              key={i}
              onClick={() => { setInputText(s); }}
              className="px-3 py-1.5 bg-glass border border-[var(--border)] rounded-full text-[10px] font-bold text-dim hover:border-accent hover:text-accent transition-all whitespace-nowrap"
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex gap-2 bg-glass p-1.5 rounded-2xl border border-[var(--border)] shadow-inner">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.chat.placeholder}
            className="flex-1 bg-transparent px-4 py-2.5 outline-none text-xs font-medium text-[var(--text)] placeholder:text-dim"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim() || isTyping}
            className="bg-accent text-white disabled:opacity-30 px-3 py-2.5 rounded-xl hover:opacity-90 transition-all active:scale-95 shadow-md shadow-accent/20"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
