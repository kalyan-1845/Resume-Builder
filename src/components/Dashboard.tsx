/**
 * @author Bhoompally Kalyan Reddy
 * @email prsnlkalyan@gmail.com
 * @github https://github.com/kalyan-1845
 * @copyright 2026 Bhoompally Kalyan Reddy. All rights reserved.
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Download, Settings, Award, Palette, 
  RotateCcw, Sun, Moon, Check 
} from 'lucide-react';
import { ResumeData, TemplateId, AIReviewResult } from '../types';
import { defaultResumeData } from '../utils/defaultData';
import { ResumeForm } from './ResumeForm';
import { LivePreview } from './LivePreview';
import { AIConfig } from './AIConfig';
import { AIReviewer } from './AIReviewer';
import { generateLocalSummary, enhanceLocalBullet, evaluateLocalResume } from '../utils/localAI';
import { generateGeminiSummary, enhanceGeminiBullet, evaluateGeminiResume } from '../utils/geminiAI';
import html2pdf from 'html2pdf.js';

export const Dashboard: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [templateId, setTemplateId] = useState<TemplateId>('modern');
  const [activeSection, setActiveSection] = useState<string>('profile');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [apiKey, setApiKey] = useState<string>('');

  const [review, setReview] = useState<AIReviewResult | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [isEnhancingBulletId, setIsEnhancingBulletId] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const previewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key') || '';
    setApiKey(savedKey);
    
    const savedTheme = localStorage.getItem('dashboard_theme') || 'light';
    setTheme(savedTheme as 'light' | 'dark');
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('dashboard_theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const handleSaveKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('gemini_api_key', key);
  };

  const handleResetData = () => {
    if (window.confirm("Are you sure you want to restore the default professional candidate profile? All current edits will be overwritten.")) {
      setResumeData(defaultResumeData);
      setReview(null);
    }
  };

  const handleGenerateSummary = async (role: string, selectedStyle: string) => {
    setIsGeneratingSummary(true);
    try {
      let finalSummary = '';
      const skillsList = resumeData.skills.map(sk => sk.name);

      if (apiKey) {
        finalSummary = await generateGeminiSummary(apiKey, role, skillsList);
      } else {
        finalSummary = generateLocalSummary(role, skillsList);
      }

      setResumeData(prev => ({ ...prev, summary: finalSummary }));
      triggerPreviewFlash();
    } catch (err: any) {
      alert(`AI summary write failed: ${err.message || err}`);
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const handleEnhanceBullet = async (experienceId: string, role: string, rawText: string) => {
    setIsEnhancingBulletId(experienceId);
    try {
      let polishedText = '';
      if (apiKey) {
        polishedText = await enhanceGeminiBullet(apiKey, role, rawText);
      } else {
        polishedText = enhanceLocalBullet(role, rawText);
      }

      const updatedExps = resumeData.experiences.map(exp => 
        exp.id === experienceId ? { ...exp, description: polishedText } : exp
      );
      setResumeData(prev => ({ ...prev, experiences: updatedExps }));
      triggerPreviewFlash();
    } catch (err: any) {
      alert(`AI bullet polish failed: ${err.message || err}`);
    } finally {
      setIsEnhancingBulletId(null);
    }
  };

  const handleRunReview = async () => {
    setIsEvaluating(true);
    try {
      let scoreResult: AIReviewResult;
      if (apiKey) {
        scoreResult = await evaluateGeminiResume(apiKey, resumeData);
      } else {
        scoreResult = evaluateLocalResume(resumeData);
      }
      setReview(scoreResult);
      setIsReviewOpen(true);
    } catch (err: any) {
      alert(`AI quality review failed: ${err.message || err}`);
    } finally {
      setIsEvaluating(false);
    }
  };

  const triggerPreviewFlash = () => {
    const el = document.getElementById('resume-canvas-pdf');
    if (el) {
      el.classList.add('highlight-update');
      setTimeout(() => {
        el.classList.remove('highlight-update');
      }, 1200);
    }
  };

  const handleDownloadPDF = () => {
    const element = previewRef.current;
    if (!element) return;

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);

    const safeName = resumeData.profile.name 
      ? resumeData.profile.name.replace(/\s+/g, '_') 
      : 'Resume';

    const opt = {
      margin: 0,
      filename: `${safeName}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2.2,
        useCORS: true, 
        letterRendering: true,
        scrollX: 0,
        scrollY: 0
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css'] }
    };

    html2pdf().from(element).set(opt).save();
  };

  return (
    <div style={layoutStyle} className="animate-fade-in">
      <header style={headerStyle} className="glass-panel no-print">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={logoBadgeStyle}>
            <Sparkles size={20} color="#ffffff" />
          </div>
          <div>
            <h1 style={logoTextStyle}>Antigravity Resume</h1>
            <span style={subLogoStyle}>AI-Powered Professional Creator</span>
          </div>
        </div>

        <div style={toolbarStyle}>
          <div style={controlGroupStyle}>
            <Palette size={16} color="var(--text-secondary)" />
            <select 
              value={templateId} 
              onChange={(e) => setTemplateId(e.target.value as TemplateId)}
              style={selectStyle}
            >
              <option value="modern">Modern Slate</option>
              <option value="creative">Emerald Creative</option>
              <option value="tech">Developer Tech</option>
              <option value="minimal">Editorial Minimal</option>
            </select>
          </div>

          <button onClick={toggleTheme} className="btn btn-ghost" style={actionBtnStyle} title="Toggle Dark Mode">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <button onClick={handleResetData} className="btn btn-ghost" style={actionBtnStyle} title="Reset Default Data">
            <RotateCcw size={18} />
          </button>

          <button onClick={() => setIsConfigOpen(true)} className="btn btn-ghost" style={actionBtnStyle} title="AI Configurations">
            <Settings size={18} />
          </button>

          <button 
            onClick={() => setIsReviewOpen(!isReviewOpen)} 
            className={`btn ${isReviewOpen ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px' }}
          >
            <Award size={16} /> {isReviewOpen ? 'Hide Score' : 'AI Score'}
          </button>

          <button 
            onClick={handleDownloadPDF} 
            className="btn btn-primary"
            style={{ padding: '8px 16px', minWidth: '135px' }}
          >
            {downloadSuccess ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Check size={16} /> Complete!
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Download size={16} /> Export PDF
              </span>
            )}
          </button>
        </div>
      </header>

      <main style={mainWorkspaceStyle}>
        
        <div style={leftColumnStyle} className="no-print">
          {isReviewOpen && (
            <AIReviewer 
              review={review}
              onRunReview={handleRunReview}
              isEvaluating={isEvaluating}
              hasKey={apiKey !== ''}
            />
          )}

          <ResumeForm 
            data={resumeData}
            onChange={setResumeData}
            activeSection={activeSection}
            onSectionFocus={setActiveSection}
            onGenerateSummary={handleGenerateSummary}
            onEnhanceBullet={handleEnhanceBullet}
            isGeneratingSummary={isGeneratingSummary}
            isEnhancingBulletId={isEnhancingBulletId}
            hasKey={apiKey !== ''}
          />
        </div>

        <div style={rightColumnStyle}>
          <LivePreview 
            data={resumeData}
            templateId={templateId}
            activeSection={activeSection}
            previewRef={previewRef}
          />
        </div>

      </main>

      <AIConfig 
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        apiKey={apiKey}
        onSaveKey={handleSaveKey}
      />
    </div>
  );
};

const layoutStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  padding: '16px',
  gap: '16px',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 24px',
  width: '100%',
  zIndex: 10,
};

const logoBadgeStyle: React.CSSProperties = {
  width: '38px',
  height: '38px',
  borderRadius: '10px',
  background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const logoTextStyle: React.CSSProperties = {
  fontSize: '1.15rem',
  fontWeight: '800',
  color: 'var(--text-primary)',
  letterSpacing: '-0.02em',
  lineHeight: '1.1',
};

const subLogoStyle: React.CSSProperties = {
  fontSize: '0.72rem',
  color: 'var(--text-secondary)',
  fontWeight: '500',
};

const toolbarStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};

const controlGroupStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '6px 12px',
  borderRadius: 'var(--radius-md)',
  backgroundColor: 'var(--bg-app)',
  border: '1px solid var(--border-color)',
};

const selectStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  fontSize: '0.88rem',
  fontWeight: '600',
  color: 'var(--text-primary)',
  cursor: 'pointer',
  outline: 'none',
};

const actionBtnStyle: React.CSSProperties = {
  padding: '8px',
  borderRadius: 'var(--radius-md)',
  border: '1px solid var(--border-color)',
  backgroundColor: 'var(--bg-panel)',
  color: 'var(--text-secondary)',
  cursor: 'pointer',
};

const mainWorkspaceStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '4.8fr 7.2fr',
  gap: '20px',
  alignItems: 'flex-start',
  flex: 1,
};

const leftColumnStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  maxHeight: 'calc(100vh - 110px)',
  overflowY: 'auto',
  paddingRight: '4px',
};

const rightColumnStyle: React.CSSProperties = {
  maxHeight: 'calc(100vh - 110px)',
  overflowY: 'auto',
  display: 'flex',
  justifyContent: 'center',
  borderRadius: 'var(--radius-lg)',
  backgroundColor: 'var(--bg-glass)',
  border: '1px solid var(--border-color)',
};
