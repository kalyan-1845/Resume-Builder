/**
 * @author Bhoompally Kalyan Reddy
 * @email prsnlkalyan@gmail.com
 * @github https://github.com/kalyan-1845
 * @copyright 2026 Bhoompally Kalyan Reddy. All rights reserved.
 */

import React from 'react';
import { ResumeData } from '../types';

interface TemplateProps {
  data: ResumeData;
  activeSection: string;
}

export const TemplateMinimal: React.FC<TemplateProps> = ({ data, activeSection }) => {
  const { profile, summary, experiences, educations, skills, projects, languages, certifications } = data;

  const isSectionActive = (secName: string) => activeSection === secName;

  const contactParts = [
    profile.email,
    profile.phone,
    profile.location,
    profile.website,
    profile.github,
    profile.linkedin
  ].filter(Boolean);

  return (
    <div style={containerStyle}>
      <div 
        style={headerStyle}
        className={`resume-preview-section ${isSectionActive('profile') ? 'section-active' : ''}`}
      >
        <h1 style={nameStyle}>{profile.name || 'Your Name'}</h1>
        <h2 style={titleStyle}>{profile.title || 'Target Job Title'}</h2>
        
        {contactParts.length > 0 && (
          <div style={contactStripStyle}>
            {contactParts.map((part, idx) => (
              <span key={idx} style={{ display: 'inline-flex', alignItems: 'center' }}>
                {part}
                {idx < contactParts.length - 1 && <span style={bulletStyle}>•</span>}
              </span>
            ))}
          </div>
        )}
      </div>

      <div style={hairlineStyle}></div>

      {summary && (
        <div 
          style={sectionStyle}
          className={`resume-preview-section ${isSectionActive('summary') ? 'section-active' : ''}`}
        >
          <p style={summaryTextStyle}>{summary}</p>
        </div>
      )}

      {experiences.length > 0 && (
        <div 
          style={sectionStyle}
          className={`resume-preview-section ${isSectionActive('experience') ? 'section-active' : ''}`}
        >
          <h3 style={sectionHeadingStyle}>Professional History</h3>
          <div style={listStyle}>
            {experiences.map((exp) => (
              <div key={exp.id} style={timelineItemStyle} className="page-break-avoid">
                <div style={itemHeaderStyle}>
                  <div>
                    <h4 style={itemTitleStyle}>{exp.role}</h4>
                    <span style={itemSubTitleStyle}>{exp.company} {exp.location && `— ${exp.location}`}</span>
                  </div>
                  <span style={dateStyle}>
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p style={descStyle}>
                    {exp.description.split('\n').map((line, idx) => (
                      <span key={idx} style={{ display: 'block', marginBottom: '4px' }}>
                        — {line.startsWith('•') || line.startsWith('-') ? line.substring(1).trim() : line}
                      </span>
                    ))}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {projects.length > 0 && (
        <div 
          style={sectionStyle}
          className={`resume-preview-section ${isSectionActive('projects') ? 'section-active' : ''}`}
        >
          <h3 style={sectionHeadingStyle}>Selected Projects</h3>
          <div style={listStyle}>
            {projects.map((proj) => (
              <div key={proj.id} style={{ ...timelineItemStyle, paddingBottom: '8px' }} className="page-break-avoid">
                <div style={itemHeaderStyle}>
                  <h4 style={itemTitleStyle}>
                    {proj.name}
                    {proj.link && <span style={linkStyle}> ({proj.link})</span>}
                  </h4>
                </div>
                <p style={descStyle}>{proj.description}</p>
                {proj.technologies && (
                  <span style={{ fontSize: '0.72rem', color: '#64748b', fontStyle: 'italic', display: 'block', marginTop: '4px' }}>
                    Technologies: {proj.technologies}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {educations.length > 0 && (
        <div 
          style={sectionStyle}
          className={`resume-preview-section ${isSectionActive('education') ? 'section-active' : ''}`}
        >
          <h3 style={sectionHeadingStyle}>Education</h3>
          <div style={listStyle}>
            {educations.map((edu) => (
              <div key={edu.id} style={{ ...timelineItemStyle, paddingBottom: '0', borderBottom: 'none' }} className="page-break-avoid">
                <div style={itemHeaderStyle}>
                  <div>
                    <h4 style={itemTitleStyle}>{edu.degree}</h4>
                    <span style={itemSubTitleStyle}>{edu.school} {edu.location && `— ${edu.location}`}</span>
                  </div>
                  <span style={dateStyle}>
                    {edu.startDate} – {edu.current ? 'Present' : edu.endDate}
                  </span>
                </div>
                {edu.description && (
                  <p style={{ ...descStyle, marginTop: '2px' }}>{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div 
          style={sectionStyle}
          className={`resume-preview-section ${isSectionActive('skills') ? 'section-active' : ''}`}
        >
          <h3 style={sectionHeadingStyle}>Expertise & Skills</h3>
          <p style={skillsListStyle}>
            {skills.map((sk, idx) => (
              <span key={sk.id} className="page-break-avoid">
                {sk.name} ({sk.level})
                {idx < skills.length - 1 && <span style={{ color: '#94a3b8', margin: '0 8px' }}>•</span>}
              </span>
            ))}
          </p>
        </div>
      )}

      <div style={footerGridStyle}>
        {languages.length > 0 && (
          <div 
            style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}
            className={`resume-preview-section ${isSectionActive('languages') ? 'section-active' : ''}`}
          >
            <h4 style={footerHeadingStyle}>Languages</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {languages.map((lang) => (
                <div key={lang.id} style={{ fontSize: '0.76rem', color: '#334155' }} className="page-break-avoid">
                  <strong>{lang.name}</strong> — {lang.proficiency}
                </div>
              ))}
            </div>
          </div>
        )}

        {certifications.length > 0 && (
          <div 
            style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}
            className={`resume-preview-section ${isSectionActive('certifications') ? 'section-active' : ''}`}
          >
            <h4 style={footerHeadingStyle}>Certifications</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ fontSize: '0.76rem', color: '#334155' }} className="page-break-avoid">
                  <strong>{cert.name}</strong> — {cert.issuer} {cert.date && `(${cert.date})`}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  fontFamily: "'Lora', Georgia, serif",
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: '6px',
};

const nameStyle: React.CSSProperties = {
  fontFamily: "'Playfair Display', serif",
  fontSize: '2.1rem',
  color: '#0f172a',
  fontWeight: '600',
  letterSpacing: '-0.01em',
};

const titleStyle: React.CSSProperties = {
  fontFamily: "'Lora', serif",
  fontSize: '0.9rem',
  color: '#475569',
  fontWeight: '400',
  fontStyle: 'italic',
  letterSpacing: '0.04em',
  marginTop: '2px',
};

const contactStripStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '4px 6px',
  fontSize: '0.72rem',
  color: '#475569',
  marginTop: '6px',
};

const bulletStyle: React.CSSProperties = {
  margin: '0 8px',
  color: '#cbd5e1',
};

const hairlineStyle: React.CSSProperties = {
  height: '1px',
  backgroundColor: '#cbd5e1',
  margin: '18px 0 16px 0',
};

const sectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  marginBottom: '18px',
  padding: '4px',
  borderRadius: '4px',
};

const sectionHeadingStyle: React.CSSProperties = {
  fontFamily: "'Playfair Display', serif",
  fontSize: '0.98rem',
  fontWeight: '700',
  color: '#0f172a',
  borderBottom: '1px solid #cbd5e1',
  paddingBottom: '3px',
  letterSpacing: '0.02em',
};

const summaryTextStyle: React.CSSProperties = {
  fontSize: '0.78rem',
  color: '#334155',
  lineHeight: '1.6',
  textAlign: 'justify',
};

const listStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
};

const timelineItemStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  paddingBottom: '12px',
  borderBottom: '1px solid #f1f5f9',
};

const itemHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  gap: '12px',
};

const itemTitleStyle: React.CSSProperties = {
  fontSize: '0.84rem',
  fontWeight: '700',
  color: '#1e293b',
};

const itemSubTitleStyle: React.CSSProperties = {
  fontSize: '0.78rem',
  color: '#475569',
  fontWeight: '400',
};

const dateStyle: React.CSSProperties = {
  fontSize: '0.74rem',
  fontWeight: '500',
  color: '#475569',
  whiteSpace: 'nowrap',
};

const descStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  color: '#334155',
  lineHeight: '1.5',
};

const linkStyle: React.CSSProperties = {
  fontSize: '0.72rem',
  color: '#475569',
  fontWeight: '400',
  textDecoration: 'underline',
};

const skillsListStyle: React.CSSProperties = {
  fontSize: '0.76rem',
  color: '#334155',
  lineHeight: '1.6',
};

const footerGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '24px',
  marginTop: '10px',
  borderTop: '1px solid #cbd5e1',
  paddingTop: '16px',
};

const footerHeadingStyle: React.CSSProperties = {
  fontFamily: "'Playfair Display', serif",
  fontSize: '0.82rem',
  fontWeight: '700',
  color: '#0f172a',
  borderBottom: '1px dashed #cbd5e1',
  paddingBottom: '2px',
  marginBottom: '4px',
};
