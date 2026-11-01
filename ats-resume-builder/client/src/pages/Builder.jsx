import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import api from '../api/axios';

export default function Builder() {
  const navigate = useNavigate();
  const resumeRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState('classic');
  
  const [resumeData, setResumeData] = useState({
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    summary: '',
    experience: [],
    education: [],
    projects: [],
    skills: { languages: '', frontend: '', backend: '', database: '', tools: '' },
    certifications: []
  });

  const handleExportPDF = async () => {
    const element = resumeRef.current;
    if (!element) return;
    
    setIsExporting(true);
    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, logging: false, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resumeData.fullName.replace(/\s+/g, '_') || 'Resume'}_Resume.pdf`);
      alert('✅ PDF exported successfully!');
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export PDF');
    } finally {
      setIsExporting(false);
    }
  };

  const handleSave = async () => {
    try {
      await api.post('/resumes', resumeData);
      alert('✅ Resume saved successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save resume');
    }
  };

  const handleChange = (field, value) => setResumeData(prev => ({ ...prev, [field]: value }));

  const handleNestedChange = (section, index, field, value) => {
    setResumeData(prev => {
      const newArray = [...prev[section]];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [section]: newArray };
    });
  };

  const handleAddItem = (section, defaultItem) => {
    setResumeData(prev => ({ ...prev, [section]: [...prev[section], defaultItem] }));
  };

  const handleRemoveItem = (section, index) => {
    setResumeData(prev => {
      const newArray = [...prev[section]];
      newArray.splice(index, 1);
      return { ...prev, [section]: newArray };
    });
  };

  const handleBulletsChange = (section, index, value) => {
    setResumeData(prev => {
      const newArray = [...prev[section]];
      newArray[index] = { ...newArray[index], bullets: value.split('\n').filter(b => b.trim() !== '') };
      return { ...prev, [section]: newArray };
    });
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>Resume Builder</h1>
        <div className="header-actions">
          <select value={activeTemplate} onChange={(e) => setActiveTemplate(e.target.value)}>
            <option value="classic">Classic Template</option>
            <option value="modern">Modern Template</option>
          </select>
          <button className="btn btn-primary" onClick={handleExportPDF} disabled={isExporting}>
            {isExporting ? 'Exporting...' : '📥 Export PDF'}
          </button>
          <button className="btn btn-primary" onClick={handleSave}>💾 Save</button>
        </div>
      </div>

      <div className="builder-grid">
        <div>
          <div className="panel">
            <h3>Personal Information</h3>
            <input type="text" placeholder="Full Name" value={resumeData.fullName} onChange={(e) => handleChange('fullName', e.target.value)} />
            <input type="text" placeholder="Title (e.g., Frontend Developer)" value={resumeData.title} onChange={(e) => handleChange('title', e.target.value)} />
            <div className="row-2">
              <input type="email" placeholder="Email" value={resumeData.email} onChange={(e) => handleChange('email', e.target.value)} />
              <input type="text" placeholder="Phone" value={resumeData.phone} onChange={(e) => handleChange('phone', e.target.value)} />
            </div>
            <input type="text" placeholder="Location" value={resumeData.location} onChange={(e) => handleChange('location', e.target.value)} />
            <input type="text" placeholder="LinkedIn Username (e.g., abhishek-gupta)" value={resumeData.linkedin} onChange={(e) => handleChange('linkedin', e.target.value)} />
            <p className="muted" style={{ fontSize: '0.8rem', marginTop: '-6px' }}>We'll format as linkedin.com/in/username</p>
            <input type="text" placeholder="GitHub Username (e.g., abhishekgupta69)" value={resumeData.github} onChange={(e) => handleChange('github', e.target.value)} />
            <p className="muted" style={{ fontSize: '0.8rem', marginTop: '-6px' }}>We'll format as github.com/username</p>
          </div>

          <div className="panel">
            <h3>Professional Summary</h3>
            <textarea rows="4" placeholder="Write a brief summary..." value={resumeData.summary} onChange={(e) => handleChange('summary', e.target.value)} />
          </div>

          <div className="panel">
            <div className="page-header" style={{ marginBottom: '10px' }}>
              <h3>Work Experience</h3>
              <button className="btn btn-sm btn-primary" onClick={() => handleAddItem('experience', { title: '', company: '', duration: '', bullets: [] })}>+ Add</button>
            </div>
            {resumeData.experience.map((exp, idx) => (
              <div className="sub-panel" key={idx} style={{ position: 'relative' }}>
                <button className="btn btn-sm btn-danger" style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={() => handleRemoveItem('experience', idx)}>×</button>
                <input type="text" placeholder="Job Title" value={exp.title} onChange={(e) => handleNestedChange('experience', idx, 'title', e.target.value)} />
                <input type="text" placeholder="Company" value={exp.company} onChange={(e) => handleNestedChange('experience', idx, 'company', e.target.value)} />
                <input type="text" placeholder="Duration" value={exp.duration} onChange={(e) => handleNestedChange('experience', idx, 'duration', e.target.value)} />
                <textarea rows="3" placeholder="Bullet points (one per line)" value={exp.bullets.join('\n')} onChange={(e) => handleBulletsChange('experience', idx, e.target.value)} />
              </div>
            ))}
            {resumeData.experience.length === 0 && <p className="muted">No experience added yet.</p>}
          </div>

          <div className="panel">
            <div className="page-header" style={{ marginBottom: '10px' }}>
              <h3>Education</h3>
              <button className="btn btn-sm btn-primary" onClick={() => handleAddItem('education', { degree: '', school: '', year: '' })}>+ Add</button>
            </div>
            {resumeData.education.map((edu, idx) => (
              <div className="sub-panel" key={idx} style={{ position: 'relative' }}>
                <button className="btn btn-sm btn-danger" style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={() => handleRemoveItem('education', idx)}>×</button>
                <input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => handleNestedChange('education', idx, 'degree', e.target.value)} />
                <input type="text" placeholder="School" value={edu.school} onChange={(e) => handleNestedChange('education', idx, 'school', e.target.value)} />
                <input type="text" placeholder="Year" value={edu.year} onChange={(e) => handleNestedChange('education', idx, 'year', e.target.value)} />
              </div>
            ))}
          </div>

          <div className="panel">
            <div className="page-header" style={{ marginBottom: '10px' }}>
              <h3>Projects</h3>
              <button className="btn btn-sm btn-primary" onClick={() => handleAddItem('projects', { name: '', links: '', bullets: [] })}>+ Add</button>
            </div>
            {resumeData.projects.map((proj, idx) => (
              <div className="sub-panel" key={idx} style={{ position: 'relative' }}>
                <button className="btn btn-sm btn-danger" style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={() => handleRemoveItem('projects', idx)}>×</button>
                <input type="text" placeholder="Project Name" value={proj.name} onChange={(e) => handleNestedChange('projects', idx, 'name', e.target.value)} />
                <input type="text" placeholder="Links" value={proj.links} onChange={(e) => handleNestedChange('projects', idx, 'links', e.target.value)} />
                <textarea rows="3" placeholder="Bullet points (one per line)" value={proj.bullets.join('\n')} onChange={(e) => handleBulletsChange('projects', idx, e.target.value)} />
              </div>
            ))}
          </div>

          <div className="panel">
            <h3>Technical Skills</h3>
            <input type="text" placeholder="Languages" value={resumeData.skills.languages} onChange={(e) => handleChange('skills', { ...resumeData.skills, languages: e.target.value })} />
            <input type="text" placeholder="Frontend" value={resumeData.skills.frontend} onChange={(e) => handleChange('skills', { ...resumeData.skills, frontend: e.target.value })} />
            <input type="text" placeholder="Backend" value={resumeData.skills.backend} onChange={(e) => handleChange('skills', { ...resumeData.skills, backend: e.target.value })} />
            <input type="text" placeholder="Database" value={resumeData.skills.database} onChange={(e) => handleChange('skills', { ...resumeData.skills, database: e.target.value })} />
            <input type="text" placeholder="Tools" value={resumeData.skills.tools} onChange={(e) => handleChange('skills', { ...resumeData.skills, tools: e.target.value })} />
          </div>

          <div className="panel">
            <div className="page-header" style={{ marginBottom: '10px' }}>
              <h3>Certifications</h3>
              <button className="btn btn-sm btn-primary" onClick={() => handleAddItem('certifications', '')}>+ Add</button>
            </div>
            {resumeData.certifications.map((cert, idx) => (
              <div className="sub-panel" key={idx} style={{ position: 'relative', display: 'flex', gap: '10px' }}>
                <input type="text" placeholder="Certification" value={cert} onChange={(e) => {
                  const newCerts = [...resumeData.certifications];
                  newCerts[idx] = e.target.value;
                  handleChange('certifications', newCerts);
                }} style={{ flex: 1 }} />
                <button className="btn btn-sm btn-danger" onClick={() => {
                  const newCerts = resumeData.certifications.filter((_, i) => i !== idx);
                  handleChange('certifications', newCerts);
                }}>×</button>
              </div>
            ))}
          </div>
        </div>

        <div className="preview-wrap">
          <div className={`resume-paper ${activeTemplate}`} ref={resumeRef}>
            <h1 className="rp-name">{resumeData.fullName || 'YOUR NAME'}</h1>
            {resumeData.title && <p className="rp-contact" style={{ textAlign: 'center', marginBottom: '4px' }}>{resumeData.title}</p>}
            <p className="rp-contact">
              {[resumeData.location, resumeData.phone, resumeData.email].filter(Boolean).join(' | ')}
              <br />
              {resumeData.linkedin && <a href={`https://linkedin.com/in/${resumeData.linkedin}`} target="_blank" rel="noopener noreferrer">linkedin.com/in/{resumeData.linkedin}</a>}
              {resumeData.linkedin && resumeData.github && ' | '}
              {resumeData.github && <a href={`https://github.com/${resumeData.github}`} target="_blank" rel="noopener noreferrer">github.com/{resumeData.github}</a>}
            </p>

            {resumeData.summary && (
              <section>
                <h2>Professional Summary</h2>
                <p>{resumeData.summary}</p>
              </section>
            )}

            {resumeData.education.length > 0 && (
              <section>
                <h2>Education</h2>
                {resumeData.education.map((edu, idx) => (
                  <div className="rp-item" key={idx}>
                    <div className="rp-row">
                      <strong>{edu.degree}</strong>
                      <span>{edu.year}</span>
                    </div>
                    <div style={{ color: '#555', fontSize: '0.9rem' }}>{edu.school}</div>
                  </div>
                ))}
              </section>
            )}

            {resumeData.experience.length > 0 && (
              <section>
                <h2>Work Experience</h2>
                {resumeData.experience.map((exp, idx) => (
                  <div className="rp-item" key={idx}>
                    <div className="rp-row">
                      <strong>{exp.title}</strong>
                      <span>{exp.duration}</span>
                    </div>
                    <div style={{ fontStyle: 'italic', color: '#555', fontSize: '0.9rem' }}>{exp.company}</div>
                    <ul style={{ margin: '6px 0', paddingLeft: '20px', fontSize: '0.9rem' }}>
                      {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  </div>
                ))}
              </section>
            )}

            {resumeData.projects.length > 0 && (
              <section>
                <h2>Projects</h2>
                {resumeData.projects.map((proj, idx) => (
                  <div className="rp-item" key={idx}>
                    <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{proj.name} <span style={{ fontWeight: 'normal', color: '#666', fontSize: '0.85rem' }}>{proj.links}</span></div>
                    <ul style={{ margin: '6px 0', paddingLeft: '20px', fontSize: '0.9rem' }}>
                      {proj.bullets.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  </div>
                ))}
              </section>
            )}

            {(resumeData.skills.languages || resumeData.skills.frontend || resumeData.skills.backend || resumeData.skills.database || resumeData.skills.tools) && (
              <section>
                <h2>Technical Skills</h2>
                <div className="rp-skills">
                  {resumeData.skills.languages && <span className="rp-chip"><strong>Languages:</strong> {resumeData.skills.languages}</span>}
                  {resumeData.skills.frontend && <span className="rp-chip"><strong>Frontend:</strong> {resumeData.skills.frontend}</span>}
                  {resumeData.skills.backend && <span className="rp-chip"><strong>Backend:</strong> {resumeData.skills.backend}</span>}
                  {resumeData.skills.database && <span className="rp-chip"><strong>Database:</strong> {resumeData.skills.database}</span>}
                  {resumeData.skills.tools && <span className="rp-chip"><strong>Tools:</strong> {resumeData.skills.tools}</span>}
                </div>
              </section>
            )}

            {resumeData.certifications.length > 0 && (
              <section>
                <h2>Certifications</h2>
                <ul style={{ margin: '6px 0', paddingLeft: '20px', fontSize: '0.9rem' }}>
                  {resumeData.certifications.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}