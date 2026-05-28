/**
 * @author Bhoompally Kalyan Reddy
 * @email prsnlkalyan@gmail.com
 * @github https://github.com/kalyan-1845
 * @copyright 2026 Bhoompally Kalyan Reddy. All rights reserved.
 */

export interface Profile {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  photoUrl: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: string; // e.g., "Beginner", "Intermediate", "Advanced", "Expert"
  rating: number; // 1 to 5
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string; // comma separated list
  link: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string; // e.g. "Native", "Fluent", "Conversational"
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface ResumeData {
  profile: Profile;
  summary: string;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  projects: Project[];
  languages: Language[];
  certifications: Certification[];
}

export type TemplateId = 'modern' | 'creative' | 'tech' | 'minimal';

export interface AIReviewResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}
