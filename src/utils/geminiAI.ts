/**
 * @author Bhoompally Kalyan Reddy
 * @email prsnlkalyan@gmail.com
 * @github https://github.com/kalyan-1845
 * @copyright 2026 Bhoompally Kalyan Reddy. All rights reserved.
 */

import { ResumeData, AIReviewResult } from '../types';

/**
 * Executes a text generation query against the Google Gemini API (gemini-2.5-flash).
 */
async function callGemini(apiKey: string, prompt: string): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Gemini API error: ${response.statusText}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("No response text returned from Gemini API.");
  }

  return text.trim();
}

export async function generateGeminiSummary(apiKey: string, title: string, skills: string[]): Promise<string> {
  const prompt = `Write a highly professional, compelling 3-sentence career summary for a "${title || 'Software Professional'}" with skills in: ${skills.join(', ') || 'modern industry standards'}.
Do not add any conversational filler, meta-explanations, or quotes. Output ONLY the polished summary. Make it punchy, action-oriented, and tailored for senior recruitment.`;

  return callGemini(apiKey, prompt);
}

export async function enhanceGeminiBullet(apiKey: string, role: string, bulletText: string): Promise<string> {
  const prompt = `Rewrite the following resume work experience bullet point to make it extremely impactful, professional, and action-oriented. 
Where appropriate, enhance the description using the Google X-Y-Z formula: "Accomplished [X] as measured by [Y], by doing [Z]" (e.g. including simulated or clear business metrics, percentage increases, or time savings).
Role: ${role || 'Software Engineer'}
Raw bullet text: "${bulletText}"

Do not add conversational filler, preambles, formatting quotes, or meta-commentary. Output ONLY the single rewritten bullet point.`;

  return callGemini(apiKey, prompt);
}

export async function evaluateGeminiResume(apiKey: string, resumeData: ResumeData): Promise<AIReviewResult> {
  const prompt = `You are a world-class executive recruiter and professional resume coach. 
Analyze the following complete resume structure:
${JSON.stringify(resumeData, null, 2)}

Provide a strict, professional critique. Calculate a quality score (0 to 100) and identify precisely:
- 3 key strengths
- 3 clear weaknesses
- 4 highly actionable, industry-specific recommendations for improvement

You MUST return your answer in standard, parseable JSON format matching this schema:
{
  "score": number,
  "strengths": ["string", "string", "string"],
  "weaknesses": ["string", "string", "string"],
  "suggestions": ["string", "string", "string", "string"]
}

Do NOT wrap the JSON in markdown code blocks like \`\`\`json. Output ONLY the raw JSON string starting with { and ending with }. Ensure it parses perfectly.`;

  const rawResult = await callGemini(apiKey, prompt);
  
  try {
    // Strip markdown code block wrappers if Gemini ignored the instruction
    let cleanJSON = rawResult.trim();
    if (cleanJSON.startsWith('```')) {
      cleanJSON = cleanJSON.replace(/^```json\s*/i, '').replace(/```$/, '').trim();
    }
    
    return JSON.parse(cleanJSON) as AIReviewResult;
  } catch (error) {
    console.error("Failed to parse Gemini JSON evaluation:", rawResult, error);
    throw new Error("Gemini returned invalid JSON structure. Please try again.");
  }
}
