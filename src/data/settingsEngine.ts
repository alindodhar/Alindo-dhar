/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from '../types';

export const lightingOptions = (lang: Language) => [
  { id: 'bright_day', label: lang === 'en' ? 'Bright Sunny Day' : 'উজ্জ্বল রৌদ্রোজ্জ্বল দিন' },
  { id: 'overcast', label: lang === 'en' ? 'Cloudy / Overcast' : 'মেঘাচ্ছন্ন' },
  { id: 'sunset', label: lang === 'en' ? 'Sunset / Golden Hour' : 'সূর্যাস্ত' },
  { id: 'indoor_office', label: lang === 'en' ? 'Indoor (Office Lighting)' : 'ইনডোর (অফিস লাইটিং)' },
  { id: 'indoor_dim', label: lang === 'en' ? 'Indoor (Dim / Home)' : 'ইনডোর (অল্প আলো)' },
  { id: 'night_street', label: lang === 'en' ? 'Night Street' : 'রাতের রাস্তা' },
  { id: 'dark_room', label: lang === 'en' ? 'Dark Room / Concert' : 'অন্ধকার ঘর / কনসার্ট' },
];

export const subjectOptions = (lang: Language) => [
  { id: 'static', label: lang === 'en' ? 'Static (Object/Landscape)' : 'স্থির (বস্তু/ল্যান্ডস্কেপ)' },
  { id: 'human_candid', label: lang === 'en' ? 'Human (Candid/Walking)' : 'মানুষ (হাঁটাচলা)' },
  { id: 'human_portrait', label: lang === 'en' ? 'Human (Static Portrait)' : 'মানুষ (স্থির প্রতিকৃতি)' },
  { id: 'sports', label: lang === 'en' ? 'Sports / Fast Motion' : 'খেলাধুলা / দ্রুত গতি' },
  { id: 'birds', label: lang === 'en' ? 'Birds / Wildlife' : 'পাখি / বন্যপ্রাণী' },
];

export const motionOptions = (lang: Language) => [
  { id: 'none', label: lang === 'en' ? 'None (Static)' : 'কিছুই না (স্থির)' },
  { id: 'casual', label: lang === 'en' ? 'Casual (Walking)' : 'সাধারণ (হাঁটা)' },
  { id: 'fast', label: lang === 'en' ? 'Fast (Running/Flying)' : 'দ্রুত (দৌড়ানো/উড়া)' },
];

export const calculateSettings = (lighting: string, subject: string, motion: string, lang: Language) => {
  // Logic to determine settings
  let iso = '100';
  let shutter = '1/125';
  let aperture = 'f/8';
  let warning = '';
  let lens = '24-70mm';

  if (lighting.includes('dark') || lighting.includes('night')) {
    iso = '1600-3200';
    shutter = '1/50';
    aperture = 'f/1.8';
    warning = lang === 'en' ? 'High ISO may cause noise.' : 'বেশি আইএসওর কারণে নয়েজ হতে পারে।';
  }

  if (motion === 'fast') {
    shutter = '1/1000';
    iso = parseInt(iso) > 400 ? iso : '800';
    warning += (warning ? ' ' : '') + (lang === 'en' ? 'Watch out for light levels at high shutter speed.' : 'শাটার স্পিড বাড়লে আলো কম হতে পারে।');
  }

  return { iso, shutter, aperture, warning, lens };
};
