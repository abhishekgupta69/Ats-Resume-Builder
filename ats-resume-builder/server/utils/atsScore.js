// ─────────────────────────────────────────────────────────────
// ATS (Applicant Tracking System) scoring engine
// Extracts top keywords from a job description and scores how
// well a resume matches them, plus standard ATS parse checks.
// ─────────────────────────────────────────────────────────────

const STOPWORDS = new Set(
  (
    'a an the and or but if then else when at by for with about into through during before after above below to ' +
    'from up down in out on off over under again further once here there all any both each few more most other ' +
    'some such no nor not only own same so than too very can will just should now i me my we our us you your he ' +
    'him his she her it its they them their this that these those am is are was were be been being have has had ' +
    'having do does did doing would could ought as of s t don didnt isnt arent wont werent ll re ve also per etc'
  ).split(' ')
);

const tokenize = (text = '') =>
  (text.toLowerCase().match(/[a-z0-9][a-z0-9+#.\-/]{1,}/g) || [])
    .map((w) => w.replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, ''))
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));

// Extract the N most frequent meaningful keywords from text
function topKeywords(text, n = 25) {
  const freq = {};
  for (const word of tokenize(text)) {
    freq[word] = (freq[word] || 0) + 1;
  }
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([word]) => word);
}

// Flatten a resume document into plain text (as an ATS parser would see it)
function resumeToText(resume) {
  const p = resume.personalInfo || {};
  const parts = [
    p.fullName,
    p.email,
    p.phone,
    p.linkedin,
    p.github,
    p.summary,
    (resume.skills || []).join(' '),
    ...(resume.experience || []).map(
      (e) => `${e.role} ${e.company} ${e.description} ${e.start} ${e.end}`
    ),
    ...(resume.education || []).map((e) => `${e.degree} ${e.school} ${e.year}`),
  ];
  return parts.filter(Boolean).join('\n');
}

// Score weights
const WEIGHTS = {
  keywords: 50, // keyword match vs job description
  contact: 10, // email / phone / links
  sections: 20, // summary, skills, experience, education
  length: 10, // ideal word count range
  impact: 10, // quantified achievements
};

function analyzeResume(resumeText, jobDescription) {
  const lower = resumeText.toLowerCase();
  const words = tokenize(resumeText);

  // 1. Keyword coverage
  const jdKeywords = topKeywords(jobDescription);
  const matchedKeywords = jdKeywords.filter((k) => lower.includes(k));
  const missingKeywords = jdKeywords.filter((k) => !lower.includes(k));
  const coverage = jdKeywords.length ? matchedKeywords.length / jdKeywords.length : 0;
  const keywordScore = Math.round(coverage * WEIGHTS.keywords);

  // 2. Contact information
  let contactScore = 0;
  if (/[\w.+-]+@[\w-]+\.[\w.]+/.test(resumeText)) contactScore += 4;
  if (/(\+?\d[\d\s()\-]{7,}\d)/.test(resumeText)) contactScore += 3;
  if (/(linkedin|github|https?:\/\/)/i.test(resumeText)) contactScore += 3;

  // 3. Standard sections
  const sectionChecks = [
    /\b(summary|objective|profile)\b/i,
    /\bskills\b/i,
    /(experience|employment|work history)/i,
    /education/i,
  ];
  const sectionScore =
    sectionChecks.filter((rx) => rx.test(resumeText)).length *
    (WEIGHTS.sections / sectionChecks.length);

  // 4. Length (ideal: 250–900 words)
  const wordCount = words.length;
  let lengthScore;
  if (wordCount >= 250 && wordCount <= 900) lengthScore = WEIGHTS.length;
  else if (wordCount >= 150) lengthScore = 6;
  else if (wordCount >= 50) lengthScore = 3;
  else lengthScore = 0;

  // 5. Quantified impact (numbers, %, currency)
  const numbers = (resumeText.match(/\d+(\.\d+)?%|\$\s?\d|\b\d+\+?\b/g) || []).length;
  const impactScore = Math.min(WEIGHTS.impact, Math.round(numbers * 2));

  const score = Math.min(
    100,
    Math.round(keywordScore + contactScore + sectionScore + lengthScore + impactScore)
  );

  // Suggestions
  const suggestions = [];
  if (missingKeywords.length) {
    suggestions.push(
      `Add these missing keywords (where truthful): ${missingKeywords.slice(0, 8).join(', ')}.`
    );
  }
  if (contactScore < WEIGHTS.contact) {
    suggestions.push('Add a professional email, phone number, and LinkedIn/GitHub link.');
  }
  if (wordCount < 250) {
    suggestions.push('Resume looks short — expand your experience with 2–4 bullet points per role.');
  }
  if (impactScore < WEIGHTS.impact) {
    suggestions.push('Quantify achievements with numbers (e.g., "reduced load time by 40%").');
  }
  if (!/(summary|objective|profile)/i.test(resumeText)) {
    suggestions.push('Add a Summary section — ATS systems and recruiters both look for it.');
  }

  return {
    score,
    breakdown: {
      keywords: keywordScore,
      contact: contactScore,
      sections: sectionScore,
      length: lengthScore,
      impact: impactScore,
    },
    weights: WEIGHTS,
    totalKeywords: jdKeywords.length,
    matchedKeywords,
    missingKeywords,
    wordCount,
    suggestions,
  };
}

module.exports = { analyzeResume, resumeToText, topKeywords };
