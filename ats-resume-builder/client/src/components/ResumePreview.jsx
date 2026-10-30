// Live resume preview — updates as the user types.
// Two templates: "modern" and "classic".
export default function ResumePreview({ resume }) {
  const p = resume.personalInfo || {};
  const tpl = resume.template || 'modern';

  return (
    <div className={`resume-paper ${tpl}`}>
      <h1 className="rp-name">{p.fullName || 'Your Name'}</h1>
      <div className="rp-contact">
        {[p.email, p.phone, p.linkedin, p.github].filter(Boolean).join('  |  ')}
      </div>

      {p.summary && (
        <section>
          <h2>Summary</h2>
          <p>{p.summary}</p>
        </section>
      )}

      {resume.skills?.length > 0 && (
        <section>
          <h2>Skills</h2>
          <div className="rp-skills">
            {resume.skills.map((s) => (
              <span className="rp-chip" key={s}>
                {s}
              </span>
            ))}
          </div>
        </section>
      )}

      {resume.experience?.some((e) => e.role || e.company) && (
        <section>
          <h2>Experience</h2>
          {resume.experience.map((e, i) => (
            <div className="rp-item" key={i}>
              <div className="rp-row">
                <strong>
                  {e.role}
                  {e.company ? ` — ${e.company}` : ''}
                </strong>
                <span>
                  {[e.start, e.end].filter(Boolean).join(' – ')}
                </span>
              </div>
              {e.description && <p>{e.description}</p>}
            </div>
          ))}
        </section>
      )}

      {resume.education?.some((e) => e.degree || e.school) && (
        <section>
          <h2>Education</h2>
          {resume.education.map((e, i) => (
            <div className="rp-item" key={i}>
              <div className="rp-row">
                <strong>
                  {e.degree}
                  {e.school ? ` — ${e.school}` : ''}
                </strong>
                <span>{e.year}</span>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
