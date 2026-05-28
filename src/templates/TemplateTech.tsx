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

export const TemplateTech: React.FC<TemplateProps> = ({ data, activeSection }) => {
  const { profile, summary, experiences, educations, skills, projects } = data;

  const isSectionActive = (secName: string) => activeSection === secName;

  const categories = skills.reduce((acc, skill) => {
    const cat = skill.category || 'Core Technologies';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div style={containerStyle}>
      <div 
        style={headerStyle}
        className={`resume-preview-section ${isSectionActive('profile') ? 'section-active' : ''}`}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={nameStyle}>{profile.name || 'Your Name'}</h1>
            <h2 style={titleStyle}>&lt;{profile.title || 'Target Job Title'} /&gt;</h2>
          </div>
          {profile.photoUrl && (
            <img src={profile.photoUrl} alt={profile.name} style={photoStyle} />
          )}
        </div>

        <div style={contactListStyle}>
          {profile.email && <span style={contactLinkStyle}>email: "{profile.email}"</span>}
          {profile.phone && <span style={contactLinkStyle}>phone: "{profile.phone}"</span>}
          {profile.location && <span style={contactLinkStyle}>loc: "{profile.location}"</span>}
          {profile.website && <span style={contactLinkStyle}>web: "{profile.website}"</span>}
          {profile.github && <span style={contactLinkStyle}>github: "{profile.github}"</span>}
          {profile.linkedin && <span style={contactLinkStyle}>linkedin: "{profile.linkedin}"</span>}
        </div>
      </div>

      {summary && (
        <div 
          style={summaryBlockStyle}
          className={`resume-preview-section ${isSectionActive('summary') ? 'section-active' : ''}`}
        >
          <p style={summaryTextStyle}>
            <span style={{ color: '#2563eb', fontWeight: '700', fontFamily: 'monospace' }}>const</span> description = "{summary}";
          </p>
        </div>
      )}

      {skills.length > 0 && (
        <div 
          style={sectionStyle}
          className={`resume-preview-section ${isSectionActive('skills') ? 'section-active' : ''}`}
        >
          <h3 style={sectionHeadingStyle}>[0x01] Technical Stack</h3>
          <div style={skillsGridStyle}>
            {Object.entries(categories).map(([catName, catSkills]) => (
              <div key={catName} style={skillCategoryItemStyle} className="page-break-avoid">
                <span style={skillCatTitleStyle}>{catName}::</span>
                <div style={tagsContainerStyle}>
                  {catSkills.map((sk) => (
                    <div key={sk.id} style={techTagStyle}>
                      <span>{sk.name}</span>
                      <span style={levelStyle}>{sk.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {experiences.length > 0 && (
        <div 
          style={sectionStyle}
          className={`resume-preview-section ${isSectionActive('experience') ? 'section-active' : ''}`}
        >
          <h3 style={sectionHeadingStyle}>[0x02] Execution History</h3>
          <div style={timelineStyle}>
            {experiences.map((exp) => (
              <div key={exp.id} style={timelineItemStyle} className="page-break-avoid">
                <div style={timelineHeaderStyle}>
                  <div>
                    <h4 style={timelineRoleStyle}>
                      {exp.role} <span style={{ color: '#64748b', fontWeight: '400' }}>@</span> {exp.company}
                    </h4>
                    <span style={timelineLocationStyle}>// {exp.location || 'Remote'}</span>
                  </div>
                  <span style={timelineDateStyle}>
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p style={timelineDescStyle}>
                    {exp.description.split('\n').map((line, idx) => (
                      <span key={idx} style={{ display: 'block', marginBottom: '3px' }}>
                        &gt; {line.startsWith('•') || line.startsWith('-') ? line.substring(1).trim() : line}
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
          <h3 style={sectionHeadingStyle}>[0x03] Project Repository</h3>
          <div style={timelineStyle}>
            {projects.map((proj) => (
              <div key={proj.id} style={projectItemStyle} className="page-break-avoid">
                <div style={timelineHeaderStyle}>
                  <h4 style={timelineRoleStyle}>
                    {proj.name}
                    {proj.link && <span style={projLinkStyle}> (href: {proj.link})</span>}
                  </h4>
                </div>
                <p style={timelineDescStyle}>// {proj.description}</p>
                {proj.technologies && (
                  <div style={{ ...tagsContainerStyle, marginTop: '8px' }}>
                    {proj.technologies.split(',').map((tech, idx) => (
                      <span key={idx} style={projTagStyle}>{tech.trim()}</span>
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
          style={sectionStyle}
          className={`resume-preview-section ${isSectionActive('education') ? 'section-active' : ''}`}
        >
          <h3 style={sectionHeadingStyle}>[0x04] Academic Log</h3>
          <div style={timelineStyle}>
            {educations.map((edu) => (
              <div key={edu.id} style={{ ...timelineItemStyle, paddingBottom: '0', borderBottom: 'none' }} className="page-break-avoid">
                <div style={timelineHeaderStyle}>
                  <div>
                    <h4 style={timelineRoleStyle}>{edu.degree}</h4>
                    <span style={timelineLocationStyle}>{edu.school} {edu.location && `| ${edu.location}`}</span>
                  </div>
                  <span style={timelineDateStyle}>
                    {edu.startDate} – {edu.current ? 'Present' : edu.endDate}
                  </span>
                </div>
                {edu.description && (
                  <p style={{ ...timelineDescStyle, marginTop: '4px' }}>&gt; {edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  fontFamily: 'system-ui, -apple-system, sans-serif',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  paddingBottom: '16px',
  borderBottom: '1px solid #cbd5e1',
};

const nameStyle: React.CSSProperties = {
  fontSize: '1.9rem',
  color: '#0f172a',
  fontWeight: '800',
  letterSpacing: '-0.025em',
};

const titleStyle: React.CSSProperties = {
  fontSize: '0.95rem',
  color: '#2563eb',
  fontWeight: '600',
  fontFamily: 'monospace',
};

const photoStyle: React.CSSProperties = {
  width: '56px',
  height: '56px',
  borderRadius: '4px',
  objectFit: 'cover',
  border: '1px solid #94a3b8',
};

const contactListStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px 14px',
  fontFamily: 'monospace',
  fontSize: '0.72rem',
  color: '#475569',
};

const contactLinkStyle: React.CSSProperties = {
  whiteSpace: 'nowrap',
};

const summaryBlockStyle: React.CSSProperties = {
  margin: '16px 0',
  padding: '12px',
  backgroundColor: '#f8fafc',
  borderLeft: '3px solid #2563eb',
  borderRadius: '0 6px 6px 0',
};

const summaryTextStyle: React.CSSProperties = {
  fontSize: '0.78rem',
  color: '#334155',
  lineHeight: '1.5',
};

const sectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginBottom: '20px',
  padding: '4px',
  borderRadius: '4px',
};

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: '0.85rem',
  fontWeight: '700',
  color: '#0f172a',
  fontFamily: 'monospace',
  borderBottom: '1px solid #e2e8f0',
  paddingBottom: '4px',
};

const skillsGridStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const skillCategoryItemStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1.8fr 8.2fr',
  gap: '12px',
  alignItems: 'baseline',
};

const skillCatTitleStyle: React.CSSProperties = {
  fontSize: '0.74rem',
  fontWeight: '700',
  fontFamily: 'monospace',
  color: '#475569',
  textAlign: 'right',
};

const tagsContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
};

const techTagStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  backgroundColor: '#f1f5f9',
  border: '1px solid #e2e8f0',
  padding: '3px 8px',
  borderRadius: '4px',
  fontSize: '0.72rem',
  fontFamily: 'monospace',
  color: '#1e293b',
};

const levelStyle: React.CSSProperties = {
  fontSize: '0.62rem',
  fontWeight: '600',
  color: '#2563eb',
  backgroundColor: '#dbeafe',
  padding: '1px 4px',
  borderRadius: '2px',
};

const timelineStyle: React.CSSProperties = {
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

const timelineHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '12px',
};

const timelineRoleStyle: React.CSSProperties = {
  fontSize: '0.84rem',
  fontWeight: '700',
  color: '#0f172a',
};

const timelineLocationStyle: React.CSSProperties = {
  fontSize: '0.74rem',
  color: '#64748b',
  fontFamily: 'monospace',
};

const timelineDateStyle: React.CSSProperties = {
  fontSize: '0.74rem',
  fontWeight: '600',
  color: '#475569',
  fontFamily: 'monospace',
  whiteSpace: 'nowrap',
};

const timelineDescStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  color: '#334155',
  lineHeight: '1.45',
  whiteSpace: 'pre-line',
};

const projectItemStyle: React.CSSProperties = {
  border: '1px dashed #cbd5e1',
  padding: '12px',
  borderRadius: '6px',
};

const projLinkStyle: React.CSSProperties = {
  fontSize: '0.72rem',
  color: '#2563eb',
  fontFamily: 'monospace',
};

const projTagStyle: React.CSSProperties = {
  fontSize: '0.65rem',
  fontFamily: 'monospace',
  backgroundColor: '#f8fafc',
  border: '1px solid #cbd5e1',
  color: '#475569',
  padding: '1px 5px',
  borderRadius: '3px',
};
