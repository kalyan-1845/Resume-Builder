/**
 * @author Bhoompally Kalyan Reddy
 * @email prsnlkalyan@gmail.com
 * @github https://github.com/kalyan-1845
 * @copyright 2026 Bhoompally Kalyan Reddy. All rights reserved.
 */

import React, { useState, useEffect } from 'react';
import { 
  User, FileText, Briefcase, GraduationCap, Code, 
  Cpu, Globe, Plus, Trash2, Sparkles, ChevronDown, ChevronUp 
} from 'lucide-react';
import { ResumeData, Experience, Education, Skill, Project, Language, Certification } from '../types';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (newData: ResumeData) => void;
  activeSection: string;
  onSectionFocus: (sectionName: string) => void;
  onGenerateSummary: (role: string, selectedStyle: string) => void;
  onEnhanceBullet: (experienceId: string, role: string, rawText: string) => void;
  isGeneratingSummary: boolean;
  isEnhancingBulletId: string | null;
  hasKey: boolean;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({
  data,
  onChange,
  activeSection,
  onSectionFocus,
  onGenerateSummary,
  onEnhanceBullet,
  isGeneratingSummary,
  isEnhancingBulletId,
  hasKey
}) => {
  const [expandedSection, setExpandedSection] = useState<string>('profile');
  const [summaryStyleChip, setSummaryStyleChip] = useState<string>('Professional');

  useEffect(() => {
    onSectionFocus(expandedSection);
  }, [expandedSection]);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? '' : section);
  };

  const updateProfile = (field: keyof typeof data.profile, value: string) => {
    onChange({
      ...data,
      profile: {
        ...data.profile,
        [field]: value
      }
    });
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      company: '',
      role: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    onChange({
      ...data,
      experiences: [...data.experiences, newExp]
    });
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    const updated = data.experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onChange({ ...data, experiences: updated });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experiences: data.experiences.filter(exp => exp.id !== id)
    });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      school: '',
      degree: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    onChange({ ...data, educations: [...data.educations, newEdu] });
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    const updated = data.educations.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    onChange({ ...data, educations: updated });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      educations: data.educations.filter(edu => edu.id !== id)
    });
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: `skill-${Date.now()}`,
      name: '',
      category: 'Technical',
      level: 'Advanced',
      rating: 4
    };
    onChange({ ...data, skills: [...data.skills, newSkill] });
  };

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    const updated = data.skills.map(sk => 
      sk.id === id ? { ...sk, [field]: value } : sk
    );
    onChange({ ...data, skills: updated });
  };

  const removeSkill = (id: string) => {
    onChange({ ...data, skills: data.skills.filter(sk => sk.id !== id) });
  };

  const addProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      name: '',
      description: '',
      technologies: '',
      link: ''
    };
    onChange({ ...data, projects: [...data.projects, newProj] });
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    const updated = data.projects.map(pj => 
      pj.id === id ? { ...pj, [field]: value } : pj
    );
    onChange({ ...data, projects: updated });
  };

  const removeProject = (id: string) => {
    onChange({ ...data, projects: data.projects.filter(pj => pj.id !== id) });
  };

  const addLanguage = () => {
    const newLang: Language = { id: `lang-${Date.now()}`, name: '', proficiency: 'Native' };
    onChange({ ...data, languages: [...data.languages, newLang] });
  };

  const updateLanguage = (id: string, field: keyof Language, value: string) => {
    const updated = data.languages.map(ln => ln.id === id ? { ...ln, [field]: value } : ln);
    onChange({ ...data, languages: updated });
  };

  const addCert = () => {
    const newCert: Certification = { id: `cert-${Date.now()}`, name: '', issuer: '', date: '' };
    onChange({ ...data, certifications: [...data.certifications, newCert] });
  };

  const updateCert = (id: string, field: keyof Certification, value: string) => {
    const updated = data.certifications.map(cr => cr.id === id ? { ...cr, [field]: value } : cr);
    onChange({ ...data, certifications: updated });
  };

  return (
    <div className="glass-panel no-print" style={{ overflow: 'hidden', border: '1px solid var(--border-color)' }}>
      
      <div className="accordion-item">
        <button className="accordion-trigger" onClick={() => toggleSection('profile')}>
          <span style={sectionTitleStyle}>
            <User size={18} /> Personal Details
          </span>
          {expandedSection === 'profile' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        {expandedSection === 'profile' && (
          <div className="accordion-content">
            <div style={formGridStyle}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" className="form-control" value={data.profile.name} onChange={(e) => updateProfile('name', e.target.value)} placeholder="Jane Doe" />
              </div>
              <div className="form-group">
                <label>Professional Title</label>
                <input type="text" className="form-control" value={data.profile.title} onChange={(e) => updateProfile('title', e.target.value)} placeholder="Senior Software Engineer" />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" className="form-control" value={data.profile.email} onChange={(e) => updateProfile('email', e.target.value)} placeholder="jane.doe@example.com" />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="text" className="form-control" value={data.profile.phone} onChange={(e) => updateProfile('phone', e.target.value)} placeholder="+1 (555) 000-0000" />
              </div>
              <div className="form-group">
                <label>Location (City, State)</label>
                <input type="text" className="form-control" value={data.profile.location} onChange={(e) => updateProfile('location', e.target.value)} placeholder="New York, NY" />
              </div>
              <div className="form-group">
                <label>Personal Website</label>
                <input type="text" className="form-control" value={data.profile.website} onChange={(e) => updateProfile('website', e.target.value)} placeholder="janedoe.dev" />
              </div>
              <div className="form-group">
                <label>GitHub Username</label>
                <input type="text" className="form-control" value={data.profile.github} onChange={(e) => updateProfile('github', e.target.value)} placeholder="github.com/janedoe" />
              </div>
              <div className="form-group">
                <label>LinkedIn Link</label>
                <input type="text" className="form-control" value={data.profile.linkedin} onChange={(e) => updateProfile('linkedin', e.target.value)} placeholder="linkedin.com/in/janedoe" />
              </div>
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label>Photo URL (Optional)</label>
                <input type="text" className="form-control" value={data.profile.photoUrl} onChange={(e) => updateProfile('photoUrl', e.target.value)} placeholder="https://unsplash.com/..." />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="accordion-item">
        <button className="accordion-trigger" onClick={() => toggleSection('summary')}>
          <span style={sectionTitleStyle}>
            <FileText size={18} /> Career Summary
          </span>
          {expandedSection === 'summary' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        {expandedSection === 'summary' && (
          <div className="accordion-content">
            <div style={aiHelperHeaderStyle}>
              <div style={chipsContainerStyle}>
                {['Professional', 'Creative', 'Concise', 'Technical'].map(st => (
                  <button 
                    key={st} 
                    onClick={() => setSummaryStyleChip(st)} 
                    style={{
                      ...chipStyle,
                      backgroundColor: summaryStyleChip === st ? 'var(--primary)' : 'var(--bg-app)',
                      color: summaryStyleChip === st ? '#fff' : 'var(--text-secondary)'
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => onGenerateSummary(data.profile.title, summaryStyleChip)}
                disabled={isGeneratingSummary}
                className="btn btn-secondary btn-sm animate-glow"
                style={{ flexShrink: 0 }}
              >
                <Sparkles size={14} color="var(--primary)" /> 
                {isGeneratingSummary ? 'Writing...' : hasKey ? 'Gemini AI Summary' : 'AI Summary (Local)'}
              </button>
            </div>
            <div className="form-group">
              <textarea 
                className="form-control" 
                rows={4} 
                value={data.summary} 
                onChange={(e) => onChange({ ...data, summary: e.target.value })}
                placeholder="Write a brief professional summary..."
              ></textarea>
            </div>
          </div>
        )}
      </div>

      <div className="accordion-item">
        <button className="accordion-trigger" onClick={() => toggleSection('experience')}>
          <span style={sectionTitleStyle}>
            <Briefcase size={18} /> Work Experience
          </span>
          {expandedSection === 'experience' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        {expandedSection === 'experience' && (
          <div className="accordion-content">
            {data.experiences.map((exp, idx) => (
              <div key={exp.id} style={itemWrapperStyle}>
                <div style={itemHeaderStyle}>
                  <span style={{ fontWeight: '700', fontSize: '0.85rem' }}>Experience #{idx + 1}</span>
                  <button onClick={() => removeExperience(exp.id)} className="btn btn-danger btn-sm" style={{ padding: '4px 8px' }}>
                    <Trash2 size={14} />
                  </button>
                </div>

                <div style={formGridStyle}>
                  <div className="form-group">
                    <label>Job Title</label>
                    <input type="text" className="form-control" value={exp.role} onChange={(e) => updateExperience(exp.id, 'role', e.target.value)} placeholder="Lead Dev" />
                  </div>
                  <div className="form-group">
                    <label>Company</label>
                    <input type="text" className="form-control" value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} placeholder="Google" />
                  </div>
                  <div className="form-group">
                    <label>Start Date</label>
                    <input type="month" className="form-control" value={exp.startDate} onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>End Date</label>
                    <input type="month" className="form-control" value={exp.endDate} disabled={exp.current} onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} />
                  </div>
                  <div className="form-group" style={{ gridColumn: 'span 2', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" id={`current-${exp.id}`} checked={exp.current} onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)} />
                    <label htmlFor={`current-${exp.id}`} style={{ cursor: 'pointer', textTransform: 'none' }}>I currently work here</label>
                  </div>
                  <div className="form-group" style={{ gridColumn: 'span 2' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <label>Job Description</label>
                      <button 
                        onClick={() => onEnhanceBullet(exp.id, exp.role, exp.description)}
                        disabled={isEnhancingBulletId !== null}
                        className="btn btn-secondary btn-sm"
                        style={{ fontSize: '0.72rem', padding: '3px 8px' }}
                      >
                        <Sparkles size={11} /> 
                        {isEnhancingBulletId === exp.id ? 'Polishing...' : hasKey ? 'Gemini X-Y-Z Polish' : 'AI Polish (Local)'}
                      </button>
                    </div>
                    <textarea 
                      className="form-control" 
                      rows={3} 
                      value={exp.description} 
                      onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                      placeholder="List key achievements (separated by lines)..."
                    ></textarea>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={addExperience} className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-start' }}>
              <Plus size={14} /> Add Experience
            </button>
          </div>
        )}
      </div>

      <div className="accordion-item">
        <button className="accordion-trigger" onClick={() => toggleSection('education')}>
          <span style={sectionTitleStyle}>
            <GraduationCap size={18} /> Education
          </span>
          {expandedSection === 'education' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        {expandedSection === 'education' && (
          <div className="accordion-content">
            {data.educations.map((edu, idx) => (
              <div key={edu.id} style={itemWrapperStyle}>
                <div style={itemHeaderStyle}>
                  <span style={{ fontWeight: '700', fontSize: '0.85rem' }}>Education #{idx + 1}</span>
                  <button onClick={() => removeEducation(edu.id)} className="btn btn-danger btn-sm" style={{ padding: '4px 8px' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
                <div style={formGridStyle}>
                  <div className="form-group">
                    <label>Degree / Major</label>
                    <input type="text" className="form-control" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} placeholder="B.S. in CS" />
                  </div>
                  <div className="form-group">
                    <label>School / University</label>
                    <input type="text" className="form-control" value={edu.school} onChange={(e) => updateEducation(edu.id, 'school', e.target.value)} placeholder="UC Berkeley" />
                  </div>
                  <div className="form-group">
                    <label>Start Date</label>
                    <input type="month" className="form-control" value={edu.startDate} onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>End Date</label>
                    <input type="month" className="form-control" value={edu.endDate} disabled={edu.current} onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)} />
                  </div>
                  <div className="form-group" style={{ gridColumn: 'span 2' }}>
                    <label>Achievements / Details</label>
                    <input type="text" className="form-control" value={edu.description} onChange={(e) => updateEducation(edu.id, 'description', e.target.value)} placeholder="GPA 3.8, specialized in algorithms" />
                  </div>
                </div>
              </div>
            ))}
            <button onClick={addEducation} className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-start' }}>
              <Plus size={14} /> Add Education
            </button>
          </div>
        )}
      </div>

      <div className="accordion-item">
        <button className="accordion-trigger" onClick={() => toggleSection('skills')}>
          <span style={sectionTitleStyle}>
            <Code size={18} /> Core Competencies
          </span>
          {expandedSection === 'skills' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        {expandedSection === 'skills' && (
          <div className="accordion-content">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {data.skills.map((sk) => (
                <div key={sk.id} style={skillRowStyle}>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={sk.name} 
                    onChange={(e) => updateSkill(sk.id, 'name', e.target.value)}
                    placeholder="React, AWS, Project Management"
                    style={{ flex: 2 }}
                  />
                  <input 
                    type="text" 
                    className="form-control" 
                    value={sk.category} 
                    onChange={(e) => updateSkill(sk.id, 'category', e.target.value)}
                    placeholder="Category"
                    style={{ flex: 1.5 }}
                  />
                  <div style={ratingSliderContainerStyle}>
                    <input 
                      type="range" 
                      min="1" 
                      max="5" 
                      value={sk.rating} 
                      onChange={(e) => {
                        const r = parseInt(e.target.value);
                        const levels = ["Beginner", "Basic", "Intermediate", "Advanced", "Expert"];
                        updateSkill(sk.id, 'rating', r);
                        updateSkill(sk.id, 'level', levels[r - 1]);
                      }}
                      style={{ width: '60px' }}
                    />
                    <span style={{ fontSize: '0.74rem', minWidth: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                      {sk.level}
                    </span>
                  </div>
                  <button onClick={() => removeSkill(sk.id)} className="btn btn-danger btn-sm" style={{ padding: '6px' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={addSkill} className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-start', marginTop: '6px' }}>
              <Plus size={14} /> Add Skill
            </button>
          </div>
        )}
      </div>

      <div className="accordion-item">
        <button className="accordion-trigger" onClick={() => toggleSection('projects')}>
          <span style={sectionTitleStyle}>
            <Cpu size={18} /> Featured Projects
          </span>
          {expandedSection === 'projects' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        {expandedSection === 'projects' && (
          <div className="accordion-content">
            {data.projects.map((proj, idx) => (
              <div key={proj.id} style={itemWrapperStyle}>
                <div style={itemHeaderStyle}>
                  <span style={{ fontWeight: '700', fontSize: '0.85rem' }}>Project #{idx + 1}</span>
                  <button onClick={() => removeProject(proj.id)} className="btn btn-danger btn-sm" style={{ padding: '4px 8px' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
                <div style={formGridStyle}>
                  <div className="form-group">
                    <label>Project Name</label>
                    <input type="text" className="form-control" value={proj.name} onChange={(e) => updateProject(proj.id, 'name', e.target.value)} placeholder="OmniStream Dashboard" />
                  </div>
                  <div className="form-group">
                    <label>Project URL / Link</label>
                    <input type="text" className="form-control" value={proj.link} onChange={(e) => updateProject(proj.id, 'link', e.target.value)} placeholder="github.com/..." />
                  </div>
                  <div className="form-group" style={{ gridColumn: 'span 2' }}>
                    <label>Key Technologies Used (Comma separated)</label>
                    <input type="text" className="form-control" value={proj.technologies} onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)} placeholder="React, Node.js, WebSockets" />
                  </div>
                  <div className="form-group" style={{ gridColumn: 'span 2' }}>
                    <label>Project Description</label>
                    <textarea 
                      className="form-control" 
                      rows={2} 
                      value={proj.description} 
                      onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                      placeholder="Briefly describe the objective, build process, and quantifiable outcomes..."
                    ></textarea>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={addProject} className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-start' }}>
              <Plus size={14} /> Add Project
            </button>
          </div>
        )}
      </div>

      <div className="accordion-item" style={{ borderBottom: 'none' }}>
        <button className="accordion-trigger" onClick={() => toggleSection('languages')}>
          <span style={sectionTitleStyle}>
            <Globe size={18} /> Languages & Certs
          </span>
          {expandedSection === 'languages' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        {expandedSection === 'languages' && (
          <div className="accordion-content">
            <div style={footerListsStyle}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={subLabelStyle}>Languages</label>
                {data.languages.map((ln) => (
                  <div key={ln.id} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <input type="text" className="form-control" style={{ flex: 2 }} value={ln.name} onChange={(e) => updateLanguage(ln.id, 'name', e.target.value)} placeholder="English" />
                    <input type="text" className="form-control" style={{ flex: 1.5 }} value={ln.proficiency} onChange={(e) => updateLanguage(ln.id, 'proficiency', e.target.value)} placeholder="Native" />
                    <button onClick={() => onChange({ ...data, languages: data.languages.filter(l => l.id !== ln.id) })} className="btn btn-danger btn-sm" style={{ padding: '6px' }}>
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
                <button onClick={addLanguage} className="btn btn-ghost btn-sm" style={{ alignSelf: 'flex-start', padding: '4px 8px' }}>
                  <Plus size={12} /> Add Language
                </button>
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={subLabelStyle}>Certifications</label>
                {data.certifications.map((cr) => (
                  <div key={cr.id} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <input type="text" className="form-control" style={{ flex: 2 }} value={cr.name} onChange={(e) => updateCert(cr.id, 'name', e.target.value)} placeholder="AWS Solutions Architect" />
                    <input type="text" className="form-control" style={{ flex: 1 }} value={cr.issuer} onChange={(e) => updateCert(cr.id, 'issuer', e.target.value)} placeholder="AWS" />
                    <button onClick={() => onChange({ ...data, certifications: data.certifications.filter(c => c.id !== cr.id) })} className="btn btn-danger btn-sm" style={{ padding: '6px' }}>
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
                <button onClick={addCert} className="btn btn-ghost btn-sm" style={{ alignSelf: 'flex-start', padding: '4px 8px' }}>
                  <Plus size={12} /> Add Cert
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

const sectionTitleStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  color: 'var(--text-primary)',
};

const formGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '14px',
};

const itemWrapperStyle: React.CSSProperties = {
  backgroundColor: 'var(--bg-app)',
  padding: '16px',
  borderRadius: '8px',
  border: '1px solid var(--border-color)',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginBottom: '4px',
};

const itemHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid var(--border-color)',
  paddingBottom: '8px',
  color: 'var(--text-primary)',
};

const skillRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
};

const ratingSliderContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
};

const footerListsStyle: React.CSSProperties = {
  display: 'flex',
  gap: '20px',
};

const subLabelStyle: React.CSSProperties = {
  fontSize: '0.74rem',
  fontWeight: '700',
  textTransform: 'uppercase',
  color: 'var(--text-secondary)',
  letterSpacing: '0.04em',
  marginBottom: '2px',
};

const aiHelperHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '12px',
};

const chipsContainerStyle: React.CSSProperties = {
  display: 'flex',
  gap: '6px',
  flexWrap: 'wrap',
};

const chipStyle: React.CSSProperties = {
  padding: '4px 10px',
  borderRadius: '9999px',
  fontSize: '0.72rem',
  fontWeight: '600',
  cursor: 'pointer',
  border: 'none',
  transition: 'all 0.2s ease',
};
