/**
 * @author Bhoompally Kalyan Reddy
 * @email prsnlkalyan@gmail.com
 * @github https://github.com/kalyan-1845
 * @copyright 2026 Bhoompally Kalyan Reddy. All rights reserved.
 */

import { ResumeData } from '../types';

export const defaultResumeData: ResumeData = {
  profile: {
    name: 'Alex Morgan',
    title: 'Lead Full-Stack Engineer',
    email: 'alex.morgan@dev.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    website: 'alexmorgan.dev',
    github: 'github.com/alexmorgan',
    linkedin: 'linkedin.com/in/alexmorgan',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256'
  },
  summary: 'Lead Full-Stack Engineer with 7+ years of experience designing and implementing scalable web applications, real-time dashboards, and microservice architectures. Proven track record of optimizing frontend rendering pipelines and leading cross-functional engineering teams to deliver robust cloud-native products.',
  experiences: [
    {
      id: 'exp-1',
      company: 'CloudScale Analytics',
      role: 'Senior Lead Full-Stack Engineer',
      location: 'San Francisco, CA',
      startDate: '2023-01',
      endDate: '',
      current: true,
      description: 'Spearheaded the migration of a legacy monolithic enterprise platform to a modern React, Node.js, and AWS-based microservices architecture, reducing infrastructure costs by 32%.\nLed an agile team of 8 engineers, mentoring juniors and establishing robust CI/CD, testing, and documentation standards.\nOptimized core frontend rendering cycles using React concurrent mode and virtualization, resulting in a 40% improvement in Initial Page Load and Lighthouse scores.'
    },
    {
      id: 'exp-2',
      company: 'IntelliTech Systems',
      role: 'Software Engineer III',
      location: 'Boston, MA',
      startDate: '2020-08',
      endDate: '2022-12',
      current: false,
      description: 'Architected and built real-time collaborative dashboard widgets using WebSockets and React, increasing daily user engagement by 18%.\nRefactored state management layers using Redux Toolkit, decreasing codebase size by 15% and resolving long-standing race conditions.\nCollaborated directly with product managers and UX designers to establish the company\'s reusable core design system components.'
    }
  ],
  educations: [
    {
      id: 'edu-1',
      school: 'University of California, Berkeley',
      degree: 'B.S. in Computer Science & Engineering',
      location: 'Berkeley, CA',
      startDate: '2016-09',
      endDate: '2020-05',
      current: false,
      description: 'Graduated with Honors. Specialization in Distributed Systems and Human-Computer Interaction. Recipient of the Academic Excellence Scholarship.'
    }
  ],
  skills: [
    {
      id: 'skill-1',
      name: 'TypeScript / JavaScript',
      category: 'Frontend',
      level: 'Expert',
      rating: 5
    },
    {
      id: 'skill-2',
      name: 'React / Next.js',
      category: 'Frontend',
      level: 'Expert',
      rating: 5
    },
    {
      id: 'skill-3',
      name: 'Node.js / Express',
      category: 'Backend',
      level: 'Expert',
      rating: 5
    },
    {
      id: 'skill-4',
      name: 'Python / FastAPI',
      category: 'Backend',
      level: 'Advanced',
      rating: 4
    },
    {
      id: 'skill-5',
      name: 'PostgreSQL & MongoDB',
      category: 'Databases',
      level: 'Advanced',
      rating: 4
    },
    {
      id: 'skill-6',
      name: 'AWS (S3, EC2, Lambda)',
      category: 'DevOps & Cloud',
      level: 'Advanced',
      rating: 4
    },
    {
      id: 'skill-7',
      name: 'Docker & Kubernetes',
      category: 'DevOps & Cloud',
      level: 'Advanced',
      rating: 4
    }
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'OmniStream - Real-Time Dashboard',
      description: 'A high-performance streaming telemetry dashboard handling over 10,000 active events per second. Built with React, Tailwind CSS, WebSockets, and Node.js. Incorporates elegant canvas charts and canvas rendering pipelines.',
      technologies: 'React, WebSockets, Node.js, HTML5 Canvas, Tailwind CSS',
      link: 'github.com/alexmorgan/omnistream'
    },
    {
      id: 'proj-2',
      name: 'GitFlow AI - Code Review Companion',
      description: 'A Git integration service leveraging Gemini API to automate codebase code quality reviews, identify logical edge-case bugs, and suggest semantic code refactoring directly inside pull requests.',
      technologies: 'TypeScript, Gemini API, Node.js, GitHub Octokit, Docker',
      link: 'github.com/alexmorgan/gitflow-ai'
    }
  ],
  languages: [
    {
      id: 'lang-1',
      name: 'English',
      proficiency: 'Native'
    },
    {
      id: 'lang-2',
      name: 'Spanish',
      proficiency: 'Conversational'
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      date: '2024'
    },
    {
      id: 'cert-2',
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'The Linux Foundation',
      date: '2023'
    }
  ]
};
