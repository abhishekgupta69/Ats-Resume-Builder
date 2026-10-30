import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import ResumePreview from '../components/ResumePreview';

const emptyResume = {
  title: 'Untitled Resume',
  template: 'modern',
  personalInfo: { fullName: '', email: '', phone: '', linkedin: '', github: '', summary: '' },
  skills: [],
  experience: [{ company: '', role: '', start: '', end: '', description: '' }],
  education: [{ school: '', degree: '', year: '' }],
};

export default function Builder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(emptyResume);
  const [skillInput, setSkillInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (id) {
      api
        .get(`/resumes/${id}`)
        .then((res) => setResume({ ...emptyResume, ...res.data }))
        .catch(() => navigate('/dashboard'));
    }
  }, [id, navigate]);

  const setPI = (key, value) =>
    setResume((r) => ({ ...r, personalInfo: { ...r.personalInfo, [key]: value } }));

  const addSkill = (e) => {
    e.preventDefault();
    const s = skillInput.trim();
    if (s && !resume.skills.includes(s)) {
      setResume((r) => ({ ...r, skills: [...r.skills, s] }));
    }
    setSkillInput('');
  };

  const removeSkill = (s) =>
    setResume((r) => ({ ...r, skills: r.skills.filter((x) => x !== s) }));

  const setExp = (i, key, value) =>
    setResume((r) => {
      const exp = [...r.experience];
      exp[i] = { ...exp[i], [key]: value };
      return { ...r, experience: exp };
    });

  const setEdu = (i, key, value) =>
    setResume((r) => {
      const edu = [...r.education];
      edu[i] = { ...edu[i], [key]: value };
      return { ...r, education: edu };
    });

  const save = async () => {
    setSaving(true);
    setMsg('');
    try {
      if (id) {
        await api.put(`/resumes/${id}`, resume);
        setMsg('Saved successfully.');
      } else {
        const res = await api.post('/resumes', resume);
        navigate(`/builder/${res.data._id}`, { replace: true });
      }
    } catch (err) {
      setMsg(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const print = () => window.print();

  return (
    <div>
      <div className="page-header no-print">
        <input
          className="title-input"
          value={resume.title}
          onChange={(e) => setResume((r) => ({ ...r, title: e.target.value }))}
        />
        <div className="header-actions">
          <select
            value={resume.template}
            onChange={(e) => setResume((r) => ({ ...r, template: e.target.value }))}
          >
            <option value="modern">Modern template</option>
            <option value="classic">Classic template</option>
          </select>
          <button className="btn" onClick={print}>
            Export PDF
          </button>
          <button className="btn btn-primary" onClick={save} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
      {msg && <p className="no-print muted">{msg}</p>}

      <div className="builder-grid">
        {/* ── Form (left) ── */}
        <div className="builder-form no-print">
          <section className="panel">
            <h3>Personal Info</h3>
            <input placeholder="Full name" value={resume.personalInfo.fullName} onChange={(e) => setPI('fullName', e.target.value)} />
            <input placeholder="Email" value={resume.personalInfo.email} onChange={(e) => setPI('email', e.target.value)} />
            <input placeholder="Phone" value={resume.personalInfo.phone} onChange={(e) => setPI('phone', e.target.value)} />
            <input placeholder="LinkedIn URL" value={resume.personalInfo.linkedin} onChange={(e) => setPI('linkedin', e.target.value)} />
            <input placeholder="GitHub URL" value={resume.personalInfo.github} onChange={(e) => setPI('github', e.target.value)} />
            <textarea placeholder="Professional summary..." rows="3" value={resume.personalInfo.summary} onChange={(e) => setPI('summary', e.target.value)} />
          </section>

          <section className="panel">
            <h3>Skills</h3>
            <form onSubmit={addSkill}>
              <input
                placeholder="Type a skill and press Enter (e.g., React, Node.js)"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
              />
            </form>
            <div className="chip-row">
              {resume.skills.map((s) => (
                <span className="chip" key={s}>
                  {s}
                  <button type="button" onClick={() => removeSkill(s)}>
                    ×
                  </button>
                </span>
              ))}
            </div>
          </section>

          <section className="panel">
            <h3>Experience</h3>
            {resume.experience.map((exp, i) => (
              <div className="sub-panel" key={i}>
                <input placeholder="Role / Job title" value={exp.role} onChange={(e) => setExp(i, 'role', e.target.value)} />
                <input placeholder="Company" value={exp.company} onChange={(e) => setExp(i, 'company', e.target.value)} />
                <div className="row-2">
                  <input placeholder="Start (e.g., Jan 2023)" value={exp.start} onChange={(e) => setExp(i, 'start', e.target.value)} />
                  <input placeholder="End (or Present)" value={exp.end} onChange={(e) => setExp(i, 'end', e.target.value)} />
                </div>
                <textarea placeholder="Achievements — use numbers! (e.g., improved API response time by 40%)" rows="3" value={exp.description} onChange={(e) => setExp(i, 'description', e.target.value)} />
              </div>
            ))}
            <button className="btn btn-sm" onClick={() => setResume((r) => ({ ...r, experience: [...r.experience, { company: '', role: '', start: '', end: '', description: '' }] }))}>
              + Add experience
            </button>
          </section>

          <section className="panel">
            <h3>Education</h3>
            {resume.education.map((edu, i) => (
              <div className="sub-panel" key={i}>
                <input placeholder="Degree (e.g., B.Tech CSE)" value={edu.degree} onChange={(e) => setEdu(i, 'degree', e.target.value)} />
                <div className="row-2">
                  <input placeholder="School / University" value={edu.school} onChange={(e) => setEdu(i, 'school', e.target.value)} />
                  <input placeholder="Year" value={edu.year} onChange={(e) => setEdu(i, 'year', e.target.value)} />
                </div>
              </div>
            ))}
            <button className="btn btn-sm" onClick={() => setResume((r) => ({ ...r, education: [...r.education, { school: '', degree: '', year: '' }] }))}>
              + Add education
            </button>
          </section>
        </div>

        {/* ── Live preview (right) ── */}
        <div className="preview-wrap">
          <ResumePreview resume={resume} />
        </div>
      </div>
    </div>
  );
}
