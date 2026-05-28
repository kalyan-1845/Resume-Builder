/**
 * @author Bhoompally Kalyan Reddy
 * @email prsnlkalyan@gmail.com
 * @github https://github.com/kalyan-1845
 * @copyright 2026 Bhoompally Kalyan Reddy. All rights reserved.
 */

import React from 'react';
import { Award, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';
import { AIReviewResult } from '../types';

interface AIReviewerProps {
  review: AIReviewResult | null;
  onRunReview: () => void;
  isEvaluating: boolean;
  hasKey: boolean;
}

export const AIReviewer: React.FC<AIReviewerProps> = ({ review, onRunReview, isEvaluating, hasKey }) => {
  const score = review?.score || 0;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColor = (val: number) => {
    if (val < 65) return 'var(--danger)';
    if (val < 85) return 'var(--secondary)';
    return 'var(--emerald)';
  };

  const getScoreLabel = (val: number) => {
    if (val === 0) return 'Pending Review';
    if (val < 65) return 'Needs Work';
    if (val < 85) return 'Good Quality';
    return 'Outstanding';
  };

  return (
    <div style={containerStyle} className="glass-panel animate-fade-in no-print">
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Award size={20} color="var(--primary)" />
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>AI Quality Scorecard</h3>
        </div>
        {!hasKey && (
          <span style={offlineBadgeStyle}>Offline Engine</span>
        )}
      </div>

      <div style={scoreSectionStyle}>
        <div style={gaugeContainerStyle}>
          <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="transparent"
              stroke="var(--border-color)"
              strokeWidth="10"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="transparent"
              stroke={getScoreColor(score)}
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />
          </svg>
          <div style={scoreOverlayStyle}>
            <span style={{ fontSize: '1.8rem', fontWeight: '800', color: getScoreColor(score) }}>
              {score}
            </span>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Grade
            </span>
          </div>
        </div>

        <div style={scoreMetaStyle}>
          <span style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)' }}>
            {getScoreLabel(score)}
          </span>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
            {score === 0 
              ? "Analyze your details using our professional writing standards check." 
              : `Your resume is rated ${getScoreLabel(score)} with a score of ${score}/100. Apply suggestions below to improve.`}
          </p>
          <button 
            onClick={onRunReview} 
            disabled={isEvaluating}
            className="btn btn-secondary btn-sm"
            style={{ marginTop: '8px', alignSelf: 'flex-start' }}
          >
            {isEvaluating ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="spinner" style={spinnerStyle}></span> Evaluating...
              </span>
            ) : review ? 'Re-Evaluate Resume' : 'Analyze Resume Now'}
          </button>
        </div>
      </div>

      {review && (
        <div style={critiqueContainerStyle} className="animate-slide-up">
          <div style={cardStyle}>
            <div style={cardTitleStyle}>
              <CheckCircle2 size={16} color="var(--emerald)" />
              <span style={{ fontWeight: '600', fontSize: '0.85rem', color: 'var(--text-primary)' }}>Key Strengths</span>
            </div>
            <ul style={listStyle}>
              {review.strengths.map((str, idx) => (
                <li key={idx} style={listItemStyle}>
                  <div style={{ minWidth: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--emerald)', marginTop: '6px' }}></div>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={cardStyle}>
            <div style={cardTitleStyle}>
              <AlertTriangle size={16} color="var(--danger)" />
              <span style={{ fontWeight: '600', fontSize: '0.85rem', color: 'var(--text-primary)' }}>Areas to Improve</span>
            </div>
            <ul style={listStyle}>
              {review.weaknesses.map((weak, idx) => (
                <li key={idx} style={listItemStyle}>
                  <div style={{ minWidth: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--danger)', marginTop: '6px' }}></div>
                  <span>{weak}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ ...cardStyle, gridColumn: 'span 2' }}>
            <div style={cardTitleStyle}>
              <Lightbulb size={16} color="#fbbf24" />
              <span style={{ fontWeight: '600', fontSize: '0.85rem', color: 'var(--text-primary)' }}>Improvement Checklist</span>
            </div>
            <div style={suggestionsGridStyle}>
              {review.suggestions.map((sug, idx) => (
                <div key={idx} style={suggestionItemStyle}>
                  <span style={numberBadgeStyle}>{idx + 1}</span>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{sug}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  border: '1px solid var(--border-color)',
  marginBottom: '24px',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const offlineBadgeStyle: React.CSSProperties = {
  fontSize: '0.7rem',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  padding: '4px 8px',
  borderRadius: '9999px',
  backgroundColor: 'var(--primary-light)',
  color: 'var(--primary)',
};

const scoreSectionStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
};

const gaugeContainerStyle: React.CSSProperties = {
  position: 'relative',
  width: '120px',
  height: '120px',
  flexShrink: 0,
};

const scoreOverlayStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const scoreMetaStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
};

const critiqueContainerStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '16px',
  marginTop: '8px',
};

const cardStyle: React.CSSProperties = {
  backgroundColor: 'var(--bg-app)',
  padding: '16px',
  borderRadius: '12px',
  border: '1px solid var(--border-color)',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const cardTitleStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  borderBottom: '1px solid var(--border-color)',
  paddingBottom: '8px',
};

const listStyle: React.CSSProperties = {
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const listItemStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
  fontSize: '0.8rem',
  color: 'var(--text-secondary)',
  lineHeight: '1.4',
  alignItems: 'flex-start',
};

const suggestionsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '12px',
};

const suggestionItemStyle: React.CSSProperties = {
  display: 'flex',
  gap: '10px',
  alignItems: 'flex-start',
};

const numberBadgeStyle: React.CSSProperties = {
  minWidth: '20px',
  height: '20px',
  borderRadius: '50%',
  backgroundColor: 'var(--primary-light)',
  color: 'var(--primary)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.75rem',
  fontWeight: '700',
  flexShrink: 0,
};

const spinnerStyle: React.CSSProperties = {
  display: 'inline-block',
  width: '12px',
  height: '12px',
  border: '2px solid rgba(99, 102, 241, 0.25)',
  borderTopColor: 'var(--primary)',
  borderRadius: '50%',
  animation: 'pulseGlow 1s infinite linear',
};
