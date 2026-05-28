/**
 * @author Bhoompally Kalyan Reddy
 * @email prsnlkalyan@gmail.com
 * @github https://github.com/kalyan-1845
 * @copyright 2026 Bhoompally Kalyan Reddy. All rights reserved.
 */

import React, { useState } from 'react';
import { Key, Eye, EyeOff, Check, X } from 'lucide-react';

interface AIConfigProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveKey: (key: string) => void;
}

export const AIConfig: React.FC<AIConfigProps> = ({ isOpen, onClose, apiKey, onSaveKey }) => {
  const [keyInput, setKeyInput] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveKey(keyInput.trim());
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <div style={modalOverlayStyle} className="animate-fade-in no-print">
      <div style={modalContentStyle} className="glass-panel animate-slide-up">
        <div style={modalHeaderStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={iconBadgeStyle}>
              <Key size={18} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Gemini AI Configuration</h3>
          </div>
          <button onClick={onClose} style={closeBtnStyle} className="btn-ghost">
            <X size={18} />
          </button>
        </div>

        <div style={modalBodyStyle}>
          <p style={descriptionStyle}>
            Unlock deep Generative AI features by adding your Google Gemini API key. This enables custom summaries, standard X-Y-Z formula experience enhancements, and expert resume scoring.
          </p>

          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label>Google Gemini API Key</label>
            <div style={inputContainerStyle}>
              <input
                type={showKey ? 'text' : 'password'}
                className="form-control"
                placeholder="AIzaSy..."
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                style={{ paddingRight: '40px' }}
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                style={eyeBtnStyle}
              >
                {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div style={helperContainerStyle}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              🔒 Your key is stored locally in your browser storage and never transmitted to external servers except directly to the official Google Gemini API endpoint.
            </span>
            <a
              href="https://aistudio.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              Get a free API key from Google AI Studio &rarr;
            </a>
          </div>
        </div>

        <div style={modalFooterStyle}>
          <button onClick={onClose} className="btn btn-ghost btn-sm">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn btn-primary btn-sm"
            style={{ minWidth: '100px' }}
          >
            {isSaved ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Check size={14} /> Saved!
              </span>
            ) : (
              'Save Key'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(15, 23, 42, 0.45)',
  backdropFilter: 'blur(4px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '460px',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  border: '1px solid var(--border-color)',
};

const modalHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '18px 24px',
  borderBottom: '1px solid var(--border-color)',
};

const iconBadgeStyle: React.CSSProperties = {
  width: '32px',
  height: '32px',
  borderRadius: '8px',
  backgroundColor: 'var(--primary-light)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const closeBtnStyle: React.CSSProperties = {
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  padding: '4px',
  borderRadius: '4px',
  display: 'flex',
};

const modalBodyStyle: React.CSSProperties = {
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const descriptionStyle: React.CSSProperties = {
  fontSize: '0.88rem',
  color: 'var(--text-secondary)',
  lineHeight: '1.5',
};

const inputContainerStyle: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
};

const eyeBtnStyle: React.CSSProperties = {
  position: 'absolute',
  right: '12px',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: 'var(--text-secondary)',
  display: 'flex',
};

const helperContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '12px',
  borderRadius: '8px',
  backgroundColor: 'var(--bg-app)',
};

const linkStyle: React.CSSProperties = {
  fontSize: '0.78rem',
  fontWeight: '600',
  color: 'var(--primary)',
  textDecoration: 'none',
};

const modalFooterStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '12px',
  padding: '16px 24px',
  borderTop: '1px solid var(--border-color)',
  backgroundColor: 'var(--bg-app)',
};
