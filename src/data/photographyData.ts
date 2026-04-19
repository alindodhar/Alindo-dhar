/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from '../types';

export const photoCategories = (lang: Language) => [
  { id: 'portrait', name: lang === 'en' ? 'Portrait' : 'প্রতিকৃতি', icon: 'User' },
  { id: 'landscape', name: lang === 'en' ? 'Landscape' : 'ল্যান্ডস্কেপ', icon: 'Mountain' },
  { id: 'night', name: lang === 'en' ? 'Night' : 'নাইট', icon: 'Moon' },
  { id: 'street', name: lang === 'en' ? 'Street' : 'স্ট্রিট', icon: 'Camera' },
  { id: 'product', name: lang === 'en' ? 'Product' : 'প্রোডাক্ট', icon: 'Package' },
];

export const videoModes = (lang: Language) => [
  { id: 'cinematic', name: lang === 'en' ? 'Cinematic' : 'সিনেমাটিক', icon: 'Film' },
  { id: 'vlog', name: lang === 'en' ? 'Vlog' : 'ভ্লগ', icon: 'Video' },
  { id: 'travel', name: lang === 'en' ? 'Travel' : 'ট্রাভেল', icon: 'Globe' },
  { id: 'slowmo', name: lang === 'en' ? 'Slow Motion' : 'স্লো মোশন', icon: 'Timer' },
];

export const photoDetails: Record<string, Record<Language, any>> = {
  portrait: {
    en: {
      settings: { iso: '100-400', shutter: '1/200s', aperture: 'f/1.8 - f/2.8', wb: 'Daylight/Auto' },
      tips: [
        { title: 'Eyes First', description: 'Focus on the eyes for a sharp emotional connection.' },
        { title: 'Background', description: 'Use a wide aperture to blur the background (Bokeh).' },
      ],
      mistakes: ['Shooting at midday sun', 'Distracting backgrounds', 'Too much headroom'],
    },
    bn: {
      settings: { iso: '১০০-৪০০', shutter: '১/২০০ সেকেন্ড', aperture: 'f/১.৮ - f/২.৮', wb: 'ডেলাইট/অটো' },
      tips: [
        { title: 'চোখে ফোকাস', description: 'চোখের ওপর ফোকাস করলে ছবি আরও জীবন্ত হয়।' },
        { title: 'ব্যাকগ্রাউন্ড', description: 'পেছনের অংশ আবছা করতে অ্যাপারচার কম রাখুন।' },
      ],
      mistakes: ['দুপুরের কড়া রোদে তোলা', 'উল্টোপাল্টা ব্যাকগ্রাউন্ড', 'মাথার ওপর অতিরিক্ত জায়গা'],
    }
  },
  landscape: {
    en: {
      settings: { iso: '100', shutter: '1/125s (Tripod for slow)', aperture: 'f/8 - f/11', wb: 'Daylight' },
      tips: [
        { title: 'Rule of Thirds', description: 'Place the horizon on the top or bottom third.' },
        { title: 'Foreground', description: 'Include an object in the front for depth.' },
      ],
      mistakes: ['Blurry edges', 'Boring horizons', 'Not using a tripod'],
    },
    bn: {
      settings: { iso: '১০০', shutter: '১/১২৫ সেকেন্ড', aperture: 'f/৮ - f/১১', wb: 'ডেলাইট' },
      tips: [
        { title: 'রুল অফ থার্ডস', description: 'দিগন্তকে ছবির ওপরের বা নিচের এক-তৃতীয়াংশে রাখুন।' },
        { title: 'ফোরগ্রাউন্ড', description: 'গভীরতার জন্য সামনে কিছু রাখার চেষ্টা করুন।' },
      ],
      mistakes: ['অস্পষ্ট ধার', 'একঘেয়ে দিগন্ত', 'ট্রাইপড ব্যবহার না করা'],
    }
  }
  // ... Add more categories as needed
};

export const chatKeywordData = (lang: Language) => [
  {
    keywords: ['iso', 'আইএসও'],
    responses: [
      {
        opening: lang === 'en' ? 'Great question about ISO!' : 'আইএসও সম্পর্কে চমৎকার প্রশ্ন!',
        answer: lang === 'en' ? 'ISO controls your camera transparency to light.' : 'আইএসও আপনার ক্যামেরার আলোর সংবেদনশীলতা নিয়ন্ত্রণ করে।',
        explanation: lang === 'en' ? 'Lower ISO (100) is for bright daylight, higher (3200+) is for dark rooms.' : 'কম আইএসও (১০০) দিনের আলোর জন্য, আর বেশি (৩২০০০+) অন্ধকার ঘরের জন্য।',
        suggestion: lang === 'en' ? 'Always try to keep it as low as possible for clean shots.' : 'পরিষ্কার ছবির জন্য যতটা সম্ভব এটি কম রাখার চেষ্টা করুন।',
        followUp: lang === 'en' ? 'Would you like to know about aperture next?' : 'আপনি কি এরপর অ্যাপারচার সম্পর্কে জানতে চান?',
      }
    ]
  },
  {
    keywords: ['shutter', 'শাটার'],
    responses: [
      {
        opening: lang === 'en' ? 'Let\'s talk about Shutter Speed!' : 'শাটার স্পিড নিয়ে কথা বলা যাক!',
        answer: lang === 'en' ? 'It is the time your shutter stays open.' : 'এটি হল সেই সময় যতক্ষণ আপনার শাটার খোলা থাকে।',
        explanation: lang === 'en' ? 'Fast (1/1000s) freezes motion. Slow (1/30s) creates motion blur.' : 'দ্রুত (১/১০০০স) গতিকে স্থির করে। ধীর (১/৩০স) মোশন ব্লার তৈরি করে।',
        suggestion: lang === 'en' ? 'Use a tripod for speeds slower than 1/60s.' : '১/৬০ সেকেন্ডের চেয়ে কম গতির জন্য ট্রাইপড ব্যবহার করুন।',
        followUp: lang === 'en' ? 'Do you want tips for sports photography?' : 'আপনি কি স্পোর্টস ফটোগ্রাফির জন্য টিপস চান?',
      }
    ]
  }
];
