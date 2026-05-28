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

export const TemplateModern: React.FC<TemplateProps> = ({ data, activeSection }) => {
  const { profile, summary, experiences, educations, skills, projects, languages, certifications } = data;

  const isSectionActive = (secName: string) => activeSection === secName;

  return (
    <div style={containerStyle}>
      <div 
        style={headerStyle} 
        className={`resume-preview-section ${isSectionActive('profile') ? 'section-active' : ''}`}
      >
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {profile.photoUrl && (
            <img src={profile.photoUrl} alt={profile.name} style={photoStyle} />
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <h1 style={nameStyle}>{profile.name || 'Your Name'}</h1>
            <h2 style={titleStyle}>{profile.title || 'Target Job Title'}</h2>
          </div>
        </div>
        
        <div style={contactStripStyle}>
          {profile.email && <span>✉ {profile.email}</span>}
          {profile.phone && <span>☎ {profile.phone}</span>}
          {profile.location && <span>📍 {profile.location}</span>}
          {profile.website && <span>🌐 {profile.website}</span>}
          {profile.github && <span>💻 {profile.github}</span>}
          {profile.linkedin && <span>👔 {profile.linkedin}</span>}
        </div>
      </div>

      <div style={dividerStyle}></div>

      <div style={gridStyle}>
        
        <div style={leftColStyle}>
          {skills.length > 0 && (
            <div 
              style={sectionBlockStyle}
              className={`resume-preview-section ${isSectionActive('skills') ? 'section-active' : ''}`}
            >
              <h3 style={sectionHeadingStyle}>Key Competencies</h3>
              <div style={skillsGridStyle}>
                {skills.map((skill) => (
                  <div key={skill.id} style={skillItemStyle} className="page-break-avoid">
                    <span style={skillNameStyle}>{skill.name}</span>
                    <div style={ratingTrackStyle}>
                      <div style={{ ...ratingFillStyle, width: `${(skill.rating / 5) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div 
              style={sectionBlockStyle}
              className={`resume-preview-section ${isSectionActive('languages') ? 'section-active' : ''}`}
            >
              <h3 style={sectionHeadingStyle}>Languages</h3>
              <div style={listsContainerStyle}>
                {languages.map((lang) => (
                  <div key={lang.id} style={itemCompactStyle} className="page-break-avoid">
                    <strong style={{ fontSize: '0.82rem', color: '#1e293b' }}>{lang.name}</strong>
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}> — {lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {certifications.length > 0 && (
            <div 
              style={sectionBlockStyle}
              className={`resume-preview-section ${isSectionActive('certifications') ? 'section-active' : ''}`}
            >
              <h3 style={sectionHeadingStyle}>Certifications</h3>
              <div style={listsContainerStyle}>
                {certifications.map((cert) => (
                  <div key={cert.id} style={{ ...itemCompactStyle, flexDirection: 'column', gap: '2px' }} className="page-break-avoid">
                    <strong style={{ fontSize: '0.82rem', color: '#1e293b' }}>{cert.name}</strong>
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{cert.issuer} {cert.date && `(${cert.date})`}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={rightColStyle}>
          {summary && (
            <div 
              style={sectionBlockStyle}
              className={`resume-preview-section ${isSectionActive('summary') ? 'section-active' : ''}`}
            >
              <h3 style={sectionHeadingStyle}>Professional Summary</h3>
              <p style={summaryTextStyle}>{summary}</p>
            </div>
          )}

          {experiences.length > 0 && (
            <div 
              style={sectionBlockStyle}
              className={`resume-preview-section ${isSectionActive('experience') ? 'section-active' : ''}`}
            >
              <h3 style={sectionHeadingStyle}>Professional Experience</h3>
              <div style={timelineStyle}>
                {experiences.map((exp) => (
                  <div key={exp.id} style={timelineItemStyle} className="page-break-avoid">
                    <div style={timelineHeaderStyle}>
                      <div>
                        <h4 style={timelineRoleStyle}>{exp.role}</h4>
                        <span style={timelineCompanyStyle}>{exp.company} {exp.location && `| ${exp.location}`}</span>
                      </div>
                      <span style={timelineDateStyle}>
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    {exp.description && (
                      <p style={timelineDescStyle}>
                        {exp.description.split('\n').map((line, idx) => (
                          <span key={idx} style={{ display: 'block', marginBottom: '4px' }}>
                            • {line.startsWith('•') || line.startsWith('-') ? line.substring(1).trim() : line}
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
              style={sectionBlockStyle}
              className={`resume-preview-section ${isSectionActive('projects') ? 'section-active' : ''}`}
            >
              <h3 style={sectionHeadingStyle}>Key Projects</h3>
              <div style={timelineStyle}>
                {projects.map((proj) => (
                  <div key={proj.id} style={{ ...timelineItemStyle, paddingBottom: '12px' }} className="page-break-avoid">
                    <div style={timelineHeaderStyle}>
                      <h4 style={timelineRoleStyle}>
                        {proj.name} 
                        {proj.link && <span style={projectLinkStyle}> ({proj.link})</span>}
                      </h4>
                    </div>
                    <p style={timelineDescStyle}>{proj.description}</p>
                    {proj.technologies && (
                      <div style={tagsContainerStyle}>
                        {proj.technologies.split(',').map((tech, idx) => (
                          <span key={idx} style={tagStyle}>{tech.trim()}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {educations.length > 0 && (
            <div 
              style={sectionBlockStyle}
              className={`resume-preview-section ${isSectionActive('education') ? 'section-active' : ''}`}
            >
              <h3 style={sectionHeadingStyle}>Education</h3>
              <div style={timelineStyle}>
                {educations.map((edu) => (
                  <div key={edu.id} style={{ ...timelineItemStyle, paddingBottom: '0' }} className="page-break-avoid">
                    <div style={timelineHeaderStyle}>
                      <div>
                        <h4 style={timelineRoleStyle}>{edu.degree}</h4>
                        <span style={timelineCompanyStyle}>{edu.school} {edu.location && `| ${edu.location}`}</span>
                      </div>
                      <span style={timelineDateStyle}>
                        {edu.startDate} – {edu.current ? 'Present' : edu.endDate}
                      </span>
                    </div>
                    {edu.description && (
                      <p style={{ ...timelineDescStyle, marginTop: '4px' }}>{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  paddingBottom: '4px',
};

const photoStyle: React.CSSProperties = {
  width: '64px',
  height: '64px',
  borderRadius: '8px',
  objectFit: 'cover',
  border: '2px solid #e2e8f0',
};

const nameStyle: React.CSSProperties = {
  fontSize: '2rem',
  color: '#0f172a',
  fontWeight: '800',
  letterSpacing: '-0.025em',
};

const titleStyle: React.CSSProperties = {
  fontSize: '1rem',
  color: '#6366f1',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const contactStripStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px 14px',
  fontSize: '0.74rem',
  color: '#475569',
};

const dividerStyle: React.CSSProperties = {
  height: '3px',
  backgroundColor: '#0f172a',
  margin: '14px 0 20px 0',
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '2.5fr 5.5fr',
  gap: '24px',
};

const leftColStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

const rightColStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

const sectionBlockStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  padding: '6px',
  borderRadius: '6px',
};

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: '0.9rem',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: '#0f172a',
  borderBottom: '1px solid #cbd5e1',
  paddingBottom: '4px',
};

const summaryTextStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  color: '#334155',
  lineHeight: '1.5',
};

const skillsGridStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const skillItemStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '3px',
};

const skillNameStyle: React.CSSProperties = {
  fontSize: '0.78rem',
  fontWeight: '600',
  color: '#1e293b',
};

const ratingTrackStyle: React.CSSProperties = {
  height: '4px',
  backgroundColor: '#e2e8f0',
  borderRadius: '9999px',
  overflow: 'hidden',
};

const ratingFillStyle: React.CSSProperties = {
  height: '100%',
  backgroundColor: '#475569',
};

const listsContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const itemCompactStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'baseline',
};

const timelineStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
};

const timelineItemStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  paddingBottom: '14px',
  borderBottom: '1px dashed #e2e8f0',
};

const timelineHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '12px',
};

const timelineRoleStyle: React.CSSProperties = {
  fontSize: '0.88rem',
  fontWeight: '700',
  color: '#0f172a',
};

const timelineCompanyStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  color: '#475569',
  fontWeight: '500',
};

const timelineDateStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: '600',
  color: '#64748b',
  whiteSpace: 'nowrap',
};

const timelineDescStyle: React.CSSProperties = {
  fontSize: '0.78rem',
  color: '#334155',
  lineHeight: '1.45',
};

const projectLinkStyle: React.CSSProperties = {
  fontSize: '0.72rem',
  color: '#6366f1',
  fontWeight: '400',
};

const tagsContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '4px',
  marginTop: '4px',
};

const tagStyle: React.CSSProperties = {
  fontSize: '0.65rem',
  fontWeight: '600',
  backgroundColor: '#f1f5f9',
  color: '#475569',
  padding: '2px 6px',
  borderRadius: '4px',
  border: '1px solid #e2e8f0',
};
