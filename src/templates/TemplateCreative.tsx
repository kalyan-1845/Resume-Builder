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

export const TemplateCreative: React.FC<TemplateProps> = ({ data, activeSection }) => {
  const { profile, summary, experiences, educations, skills, projects, languages } = data;

  const isSectionActive = (secName: string) => activeSection === secName;

  return (
    <div style={containerStyle}>
      <div style={sidebarStyle}>
        <div 
          style={avatarBlockStyle}
          className={`resume-preview-section ${isSectionActive('profile') ? 'section-active' : ''}`}
        >
          {profile.photoUrl ? (
            <img src={profile.photoUrl} alt={profile.name} style={photoStyle} />
          ) : (
            <div style={photoPlaceholderStyle}>
              {profile.name ? profile.name.charAt(0) : '?'}
            </div>
          )}
          <h2 style={sidebarNameStyle}>{profile.name || 'Your Name'}</h2>
          <span style={sidebarTitleStyle}>{profile.title || 'Target Job Title'}</span>
        </div>

        <div 
          style={sidebarSectionStyle}
          className={`resume-preview-section ${isSectionActive('profile') ? 'section-active' : ''}`}
        >
          <h3 style={sidebarHeadingStyle}>Contact Details</h3>
          <div style={contactListStyle}>
            {profile.email && <div style={contactItemStyle}>✉ {profile.email}</div>}
            {profile.phone && <div style={contactItemStyle}>☎ {profile.phone}</div>}
            {profile.location && <div style={contactItemStyle}>📍 {profile.location}</div>}
            {profile.website && <div style={contactItemStyle}>🌐 {profile.website}</div>}
            {profile.github && <div style={contactItemStyle}>💻 {profile.github}</div>}
            {profile.linkedin && <div style={contactItemStyle}>👔 {profile.linkedin}</div>}
          </div>
        </div>

        {skills.length > 0 && (
          <div 
            style={sidebarSectionStyle}
            className={`resume-preview-section ${isSectionActive('skills') ? 'section-active' : ''}`}
          >
            <h3 style={sidebarHeadingStyle}>Capabilities</h3>
            <div style={skillsGridStyle}>
              {skills.map((skill) => (
                <div key={skill.id} style={skillItemStyle} className="page-break-avoid">
                  <span style={skillNameStyle}>{skill.name}</span>
                  <div style={skillDotsContainerStyle}>
                    {[1, 2, 3, 4, 5].map((d) => (
                      <div 
                        key={d} 
                        style={{
                          ...skillDotStyle,
                          backgroundColor: d <= skill.rating ? '#34d399' : 'rgba(255, 255, 255, 0.2)'
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {languages.length > 0 && (
          <div 
            style={sidebarSectionStyle}
            className={`resume-preview-section ${isSectionActive('languages') ? 'section-active' : ''}`}
          >
            <h3 style={sidebarHeadingStyle}>Languages</h3>
            <div style={listsContainerStyle}>
              {languages.map((lang) => (
                <div key={lang.id} style={langItemStyle} className="page-break-avoid">
                  <span style={{ fontWeight: '600' }}>{lang.name}</span>
                  <span style={{ opacity: 0.8, fontSize: '0.72rem' }}>{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={mainContentStyle}>
        {summary && (
          <div 
            style={sectionBlockStyle}
            className={`resume-preview-section ${isSectionActive('summary') ? 'section-active' : ''}`}
          >
            <h3 style={mainHeadingStyle}>About Me</h3>
            <p style={summaryTextStyle}>{summary}</p>
          </div>
        )}

        {experiences.length > 0 && (
          <div 
            style={sectionBlockStyle}
            className={`resume-preview-section ${isSectionActive('experience') ? 'section-active' : ''}`}
          >
            <h3 style={mainHeadingStyle}>Work History</h3>
            <div style={timelineStyle}>
              {experiences.map((exp) => (
                <div key={exp.id} style={timelineItemStyle} className="page-break-avoid">
                  <div style={timelineNodeStyle}></div>
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
            <h3 style={mainHeadingStyle}>Featured Projects</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {projects.map((proj) => (
                <div key={proj.id} style={projectItemStyle} className="page-break-avoid">
                  <div style={timelineHeaderStyle}>
                    <h4 style={timelineRoleStyle}>
                      {proj.name}
                    </h4>
                    {proj.link && <span style={projLinkStyle}>{proj.link}</span>}
                  </div>
                  <p style={{ ...timelineDescStyle, margin: '4px 0 8px 0' }}>{proj.description}</p>
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
            <h3 style={mainHeadingStyle}>Education</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {educations.map((edu) => (
                <div key={edu.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }} className="page-break-avoid">
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
                    <p style={{ ...timelineDescStyle, marginTop: '2px' }}>{edu.description}</p>
                  )}
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
  width: '100%',
  minHeight: '297mm',
  margin: '-20mm',
};

const sidebarStyle: React.CSSProperties = {
  width: '74mm',
  backgroundColor: '#064e3b',
  color: '#ffffff',
  padding: '24px 18px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
};

const mainContentStyle: React.CSSProperties = {
  flex: 1,
  backgroundColor: '#ffffff',
  padding: '32px 24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
};

const avatarBlockStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  paddingBottom: '16px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
};

const photoStyle: React.CSSProperties = {
  width: '90px',
  height: '90px',
  borderRadius: '50%',
  objectFit: 'cover',
  border: '3px solid #34d399',
  marginBottom: '12px',
};

const photoPlaceholderStyle: React.CSSProperties = {
  width: '90px',
  height: '90px',
  borderRadius: '50%',
  backgroundColor: '#34d399',
  color: '#064e3b',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '2.5rem',
  fontWeight: '800',
  marginBottom: '12px',
};

const sidebarNameStyle: React.CSSProperties = {
  fontSize: '1.4rem',
  fontWeight: '800',
  color: '#ffffff',
  letterSpacing: '-0.02em',
};

const sidebarTitleStyle: React.CSSProperties = {
  fontSize: '0.82rem',
  color: '#34d399',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginTop: '2px',
};

const sidebarSectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const sidebarHeadingStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: '#34d399',
  borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
  paddingBottom: '4px',
};

const contactListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const contactItemStyle: React.CSSProperties = {
  fontSize: '0.72rem',
  wordBreak: 'break-all',
  lineHeight: '1.4',
  color: 'rgba(255, 255, 255, 0.85)',
};

const skillsGridStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const skillItemStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
};

const skillNameStyle: React.CSSProperties = {
  fontSize: '0.76rem',
  fontWeight: '500',
  color: '#ffffff',
};

const skillDotsContainerStyle: React.CSSProperties = {
  display: 'flex',
  gap: '4px',
};

const skillDotStyle: React.CSSProperties = {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
};

const listsContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const langItemStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '0.74rem',
  color: 'rgba(255, 255, 255, 0.85)',
};

const sectionBlockStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  padding: '4px',
  borderRadius: '4px',
};

const mainHeadingStyle: React.CSSProperties = {
  fontSize: '0.95rem',
  fontWeight: '800',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: '#064e3b',
  borderBottom: '2px solid #a7f3d0',
  paddingBottom: '4px',
};

const summaryTextStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  color: '#334155',
  lineHeight: '1.5',
};

const timelineStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  borderLeft: '2px solid #e2e8f0',
  paddingLeft: '14px',
  marginLeft: '6px',
  marginTop: '8px',
};

const timelineItemStyle: React.CSSProperties = {
  position: 'relative',
  paddingBottom: '16px',
};

const timelineNodeStyle: React.CSSProperties = {
  position: 'absolute',
  left: '-20.5px',
  top: '4px',
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  backgroundColor: '#064e3b',
  border: '2px solid #a7f3d0',
};

const timelineHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '12px',
};

const timelineRoleStyle: React.CSSProperties = {
  fontSize: '0.86rem',
  fontWeight: '700',
  color: '#0f172a',
};

const timelineCompanyStyle: React.CSSProperties = {
  fontSize: '0.78rem',
  color: '#475569',
  fontWeight: '600',
};

const timelineDateStyle: React.CSSProperties = {
  fontSize: '0.74rem',
  fontWeight: '600',
  color: '#064e3b',
  whiteSpace: 'nowrap',
};

const timelineDescStyle: React.CSSProperties = {
  fontSize: '0.76rem',
  color: '#334155',
  lineHeight: '1.45',
  marginTop: '6px',
};

const projectItemStyle: React.CSSProperties = {
  border: '1px solid #e2e8f0',
  padding: '12px',
  borderRadius: '8px',
  backgroundColor: '#f9fafb',
};

const projLinkStyle: React.CSSProperties = {
  fontSize: '0.72rem',
  color: '#059669',
  fontWeight: '500',
};

const tagsContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '4px',
};

const tagStyle: React.CSSProperties = {
  fontSize: '0.65rem',
  fontWeight: '600',
  backgroundColor: '#e6f4ea',
  color: '#137333',
  padding: '2px 6px',
  borderRadius: '4px',
};
