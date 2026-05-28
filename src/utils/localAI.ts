/**
 * @author Bhoompally Kalyan Reddy
 * @email prsnlkalyan@gmail.com
 * @github https://github.com/kalyan-1845
 * @copyright 2026 Bhoompally Kalyan Reddy. All rights reserved.
 */

const SUMMARY_TEMPLATES = [
  "Results-driven {role} with a strong foundation in {skills}. Proven expertise in architecting high-performance applications, collaborating with cross-functional teams, and driving operational efficiency throughout the software development life cycle.",
  "Innovative and detail-oriented {role} specializing in {skills}. Passionate about building scalable, secure architectures and creating premium, user-centric experiences that solve complex business challenges.",
  "Experienced {role} with a deep understanding of {skills}. Adept at designing robust systems, optimizing application performance, and leading engineering workflows from conception to high-impact deployment."
];

const ACTION_VERBS = [
  "Spearheaded the development of",
  "Architected and deployed",
  "Optimized core systems, achieving a 25% improvement in",
  "Collaborated with cross-functional partners to implement",
  "Designed and engineered",
  "Refactored complex modules, reducing technical debt by 30% in",
  "Enhanced rendering pipelines to boost responsiveness of"
];

export function generateLocalSummary(title: string, skills: string[]): string {
  const role = title || "Software Professional";
  const skillList = skills.length > 0 
    ? skills.slice(0, 3).join(", ") 
    : "modern tech stacks";

  const template = SUMMARY_TEMPLATES[Math.floor(Math.random() * SUMMARY_TEMPLATES.length)];
  return template
    .replace(/{role}/g, role)
    .replace(/{skills}/g, skillList);
}

export function enhanceLocalBullet(role: string, rawText: string): string {
  const cleanText = rawText.trim();
  if (!cleanText) return "Developed scalable and high-performance software modules.";

  // Strip common filler prefixes
  const stripPrefixes = /^(i worked on|i did|i was responsible for|helped to|worked on|did|managed to)\s+/i;
  let workingText = cleanText.replace(stripPrefixes, "");
  
  // Lowercase the first word if it was part of a sentence
  workingText = workingText.charAt(0).toLowerCase() + workingText.slice(1);

  const verb = ACTION_VERBS[Math.floor(Math.random() * ACTION_VERBS.length)];
  
  // Clean final string structure
  return `${verb} ${workingText}${workingText.endsWith('.') ? '' : '.'}`;
}

export function evaluateLocalResume(data: any): { score: number; strengths: string[]; weaknesses: string[]; suggestions: string[] } {
  let score = 50;
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const suggestions: string[] = [];

  // 1. Profile Evaluation
  if (data.profile.name && data.profile.title) {
    score += 10;
    strengths.push("Professional identification is complete.");
  } else {
    weaknesses.push("Missing core name or professional title.");
    suggestions.push("Ensure your full name and a target job title are clearly filled.");
  }

  if (data.profile.email && data.profile.phone && data.profile.location) {
    score += 10;
    strengths.push("Contact details are thorough.");
  } else {
    weaknesses.push("Incomplete contact or location info.");
    suggestions.push("Add a professional email, phone number, and location (City, State) to improve recruitment reach.");
  }

  if (data.profile.linkedin || data.profile.github) {
    score += 5;
    strengths.push("Links to social/code portfolios provided.");
  } else {
    weaknesses.push("No LinkedIn or GitHub profiles listed.");
    suggestions.push("Link your professional networks (LinkedIn/GitHub) to build trust.");
  }

  // 2. Summary Evaluation
  if (data.summary && data.summary.length > 50) {
    score += 15;
    strengths.push("Professional summary has substantial depth.");
    if (data.summary.length > 300) {
      score -= 5;
      weaknesses.push("Professional summary is overly verbose.");
      suggestions.push("Trim the summary down to 3 concise, high-impact sentences.");
    }
  } else {
    weaknesses.push("Professional summary is blank or too short.");
    suggestions.push("Write a robust professional summary highlighting your top skills and experience years.");
  }

  // 3. Experience Evaluation
  if (data.experiences && data.experiences.length >= 2) {
    score += 15;
    strengths.push("Excellent work history depth (2+ positions).");
  } else if (data.experiences && data.experiences.length === 1) {
    score += 8;
    weaknesses.push("Only one job listed.");
    suggestions.push("Consider expanding your experience list or adding freelance/consultancy roles.");
  } else {
    weaknesses.push("No work experience added.");
    suggestions.push("Add at least one professional or educational project experience.");
  }

  // Check bullet point lengths
  const hasShortBullets = data.experiences.some((exp: any) => exp.description.split('\n').some((line: string) => line.trim().length > 0 && line.trim().length < 20));
  if (hasShortBullets) {
    score -= 5;
    weaknesses.push("Some experience descriptions are too brief.");
    suggestions.push("Enhance brief job bullets with quantifiable results or metrics.");
  }

  // 4. Skills Evaluation
  if (data.skills && data.skills.length >= 5) {
    score += 10;
    strengths.push("Robust skill tagging database.");
  } else {
    weaknesses.push("Very few skills (less than 5) added.");
    suggestions.push("List a comprehensive index of your hard skills and methodologies.");
  }

  // 5. Projects Evaluation
  if (data.projects && data.projects.length >= 1) {
    score += 10;
    strengths.push("Projects highlight hands-on execution.");
  } else {
    suggestions.push("Add at least one personal or open-source project to demonstrate practical experience.");
  }

  // Clamp score
  score = Math.min(100, Math.max(0, score));

  return {
    score,
    strengths: strengths.slice(0, 3),
    weaknesses: weaknesses.slice(0, 3),
    suggestions: suggestions.slice(0, 4)
  };
}
