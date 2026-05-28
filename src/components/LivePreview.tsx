/**
 * @author Bhoompally Kalyan Reddy
 * @email prsnlkalyan@gmail.com
 * @github https://github.com/kalyan-1845
 * @copyright 2026 Bhoompally Kalyan Reddy. All rights reserved.
 */

import React from 'react';
import { ResumeData, TemplateId } from '../types';
import { TemplateModern } from '../templates/TemplateModern';
import { TemplateCreative } from '../templates/TemplateCreative';
import { TemplateTech } from '../templates/TemplateTech';
import { TemplateMinimal } from '../templates/TemplateMinimal';

interface LivePreviewProps {
  data: ResumeData;
  templateId: TemplateId;
  activeSection: string;
  previewRef: React.RefObject<HTMLDivElement | null>;
}

export const LivePreview: React.FC<LivePreviewProps> = ({ data, templateId, activeSection, previewRef }) => {
  const renderTemplate = () => {
    switch (templateId) {
      case 'modern':
        return <TemplateModern data={data} activeSection={activeSection} />;
      case 'creative':
        return <TemplateCreative data={data} activeSection={activeSection} />;
      case 'tech':
        return <TemplateTech data={data} activeSection={activeSection} />;
      case 'minimal':
        return <TemplateMinimal data={data} activeSection={activeSection} />;
      default:
        return <TemplateModern data={data} activeSection={activeSection} />;
    }
  };

  const isEditing = activeSection !== '';

  return (
    <div className="preview-container">
      <div 
        id="resume-canvas-pdf"
        ref={previewRef} 
        className={`resume-paper animate-slide-up ${isEditing ? 'preview-focused' : ''}`}
        style={{
          boxSizing: 'border-box',
          transformOrigin: 'top center',
        }}
      >
        {renderTemplate()}
      </div>
    </div>
  );
};
