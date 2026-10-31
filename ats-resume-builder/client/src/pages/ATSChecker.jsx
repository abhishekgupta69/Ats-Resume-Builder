import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as pdfjsLib from 'pdfjs-dist';
// Import the worker file directly from node_modules (Vite compatible)
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import api from '../api/axios';
import ScoreGauge from '../components/ScoreGauge';

// Configure the PDF.js worker to use the local imported file
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default function ATSChecker() {
  const location = useLocation();
  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState(location.state?.resumeId || '');
  const [resumeText, setResumeText] = useState('');
  const [jd, setJd] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    api.get('/resumes').then((res) => setResumes(res.data)).catch(() => {});
  }, []);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    
    if (!file) {
      alert('No file selected.');
      return;
    }
    
    console.log('File selected:', file.name, file.type, file.size);

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      alert('Please upload a valid PDF file.');
      return;
    }

    setIsUploading(true);
    try {
      console.log('Starting PDF extraction...');
      const arrayBuffer = await file.arrayBuffer();
      console.log('File loaded, size:', arrayBuffer.byteLength, 'bytes');
      
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      console.log('PDF loaded successfully, pages:', pdf.numPages);
      
      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        console.log('Extracting page', i);
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + '\n';
      }
      
      console.log('Extraction complete! Text length:', fullText.length);
      console.log('Extracted text preview:', fullText.substring(0, 200));
      
      setResumeText(fullText);
      alert('✅ PDF extracted successfully! Text has been loaded into the textarea.');
    } catch (error) {
      console.error('Detailed PDF error:', error);
      console.error('Error stack:', error.stack);
      alert(`❌ Failed to read PDF.\n\nError: ${error.message}\n\nCheck the browser console (F12) for more details.`);
    } finally {
      setIsUploading(false);
    }
  };

  const score = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await api.post('/ats/score', { resumeId, resumeText, jobDescription: jd });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Scoring failed');
    } finally {
      setLoading(false);
    }
  };

  const breakdownRows = result
    ? [
        ['Keyword match', result.breakdown.keywords, result.weights.keywords],
        ['Contact info', result.breakdown.contact, result.weights.contact],
        ['Sections', result.breakdown.sections, result.weights.sections],
        ['Length', result.breakdown.length, result.weights.length],
        ['Quantified impact', result.breakdown.impact, result.weights.impact],
      ]
    : [];

  return (
    <div className="ats-page">
      <div className="page-header">
        <h1>ATS Score Checker</h1>
      </div>

      <form onSubmit={score} className="ats-form">
        <div className="panel">
          <h3>1. Choose your resume</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <label 
              htmlFor="pdf-upload" 
              style={{
                display: 'inline-block',
                padding: '10px 16px',
                backgroundColor: isUploading ? '#9ca3af' : '#4f46e5',
                color: 'white',
                borderRadius: '6px',
                cursor: isUploading ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                fontSize: '14px',
                textAlign: 'center',
                transition: 'background-color 0.2s'
              }}
            >
              {isUploading ? '⏳ Extracting text...' : '📄 Upload PDF from Device'}
            </label>
            <input 
              id="pdf-upload"
              type="file" 
              accept="application/pdf" 
              onChange={handleFileUpload} 
              disabled={isUploading}
              style={{ display: 'none' }} 
            />
          </div>

          <select value={resumeId} onChange={(e) => setResumeId(e.target.value)}>
            <option value="">— Select a saved resume —</option>
            {resumes.map((r) => (
              <option key={r._id} value={r._id}>
                {r.title}
              </option>
            ))}
          </select>
          <p className="muted">— or paste resume text —</p>
          <textarea
            rows="6"
            placeholder="Paste your resume text here or upload a PDF..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />
        </div>

        <div className="panel">
          <h3>2. Paste the job description</h3>
          <textarea
            rows="10"
            placeholder="Paste the full job description you are applying to..."
            value={jd}
            onChange={(e) => setJd(e.target.value)}
          />
          {error && <div className="error">{error}</div>}
          <button className="btn btn-primary" disabled={loading}>
            {loading ? 'Analyzing...' : 'Score my resume'}
          </button>
        </div>
      </form>

      {result && (
        <div className="panel result-panel">
          <div className="result-top">
            <ScoreGauge score={result.score} />
            <div className="result-meta">
              <p>
                <strong>{result.matchedKeywords.length}</strong> of {result.totalKeywords} key
                job keywords matched · <strong>{result.wordCount}</strong> words
              </p>
              {result.score >= 75 && <p className="good">Great match! Your resume should pass most ATS filters.</p>}
              {result.score >= 50 && result.score < 75 && <p className="warn">Decent match — add more keywords below to improve.</p>}
              {result.score < 50 && <p className="bad">Low match — tailor your resume with the missing keywords.</p>}
            </div>
          </div>

          <h3>Score breakdown</h3>
          {breakdownRows.map(([label, val, max]) => (
            <div className="bar-row" key={label}>
              <span className="bar-label">{label}</span>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{ width: `${max ? (val / max) * 100 : 0}%` }}
                />
              </div>
              <span className="bar-value">
                {val}/{max}
              </span>
            </div>
          ))}

          <h3>Matched keywords</h3>
          <div className="chip-row">
            {result.matchedKeywords.map((k) => (
              <span className="chip chip-green" key={k}>{k}</span>
            ))}
          </div>

          <h3>Missing keywords</h3>
          {result.missingKeywords.length ? (
            <div className="chip-row">
              {result.missingKeywords.map((k) => (
                <span className="chip chip-red" key={k}>{k}</span>
              ))}
            </div>
          ) : (
            <p className="good">None — you matched every key keyword.</p>
          )}

          <h3>Suggestions</h3>
          <ul className="suggestions">
            {result.suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}