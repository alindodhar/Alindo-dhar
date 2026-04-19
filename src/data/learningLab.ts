/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language, QuizQuestion, Lesson } from '../types';

export const lessonsData = (lang: Language): Lesson[] => [
  {
    id: '1',
    title: lang === 'en' ? 'The Exposure Triangle' : 'এক্সপোজার ট্রায়াঙ্গেল',
    content: lang === 'en' ? 'Learn about ISO, Shutter Speed, and Aperture...' : 'আইএসও, শাটার স্পিড এবং অ্যাপারচার সম্পর্কে জানুন...',
    level: 'Beginner',
    category: 'Basics'
  },
  {
    id: '2',
    title: lang === 'en' ? 'Rule of Thirds' : 'রুল অফ থার্ডস',
    content: lang === 'en' ? 'Composition technique to make shots more balanced...' : 'ছবি সামঞ্জস্যপূর্ণ করার প্রধান কৌশল...',
    level: 'Beginner',
    category: 'Photography'
  }
];

export const quizData = (lang: Language): QuizQuestion[] => [
  {
    id: 'q1',
    question: lang === 'en' ? 'What does ISO control?' : 'আইএসও (ISO) কী নিয়ন্ত্রণ করে?',
    options: lang === 'en' 
      ? ['Lens focus', 'Light sensitivity', 'Shutter sound', 'Color balance']
      : ['লেন্স ফোকাস', 'আলোর সংবেদনশীলতা', 'শাটার সাউন্ড', 'কালার ব্যালেন্স'],
    correctAnswer: 1,
    explanation: lang === 'en'
      ? 'ISO controls how sensitive your sensor is to light.'
      : 'আইএসও নিয়ন্ত্রণ করে আপনার সেন্সর আলোর প্রতি কতটা সংবেদনশীল।'
  },
  {
    id: 'q2',
    question: lang === 'en' ? 'Which aperture is wider?' : 'কোন অ্যাপারচারটি বেশি প্রশস্ত?',
    options: ['f/1.8', 'f/4', 'f/11', 'f/22'],
    correctAnswer: 0,
    explanation: lang === 'en'
      ? 'Smaller f-numbers mean wider aperture openings.'
      : 'ছোট f-সংখ্যা মানে অ্যাপারচার বেশি খোলা।'
  }
];
