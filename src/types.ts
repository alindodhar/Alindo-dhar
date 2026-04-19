/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'bn';

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Pro';

export interface UserProfile {
  name: string;
  skillLevel: SkillLevel;
  avatar?: string;
}

export interface CameraSettings {
  iso: string;
  shutter: string;
  aperture: string;
  whiteBalance?: string;
  lens?: string;
  frameRate?: string;
}

export interface Tip {
  title: string;
  description: string;
}

export interface PhotographyDetails {
  settings: CameraSettings;
  tips: Tip[];
  mistakes: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  level: SkillLevel;
  category: 'Photography' | 'Videography' | 'Basics';
}

export interface Shot {
  title: string;
  angle: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  type: string;
  shots: { id: string; title: string; completed: boolean }[];
  notes: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
