import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchResumes = async () => {
    try {
      const res = await api.get('/resumes');
      setResumes(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load resumes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this resume?')) return;
    try {
      await api.delete(`/resumes/${id}`);
      setResumes((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>My Resumes</h1>
        <Link to="/builder" className="btn btn-primary">
          + New Resume
        </Link>
      </div>

      {loading && <p className="muted">Loading...</p>}
      {error && <div className="error">{error}</div>}

      {!loading && resumes.length === 0 && (
        <div className="empty-state">
          <h3>No resumes yet</h3>
          <p className="muted">Create your first ATS-friendly resume to get started.</p>
        </div>
      )}

      <div className="card-grid">
        {resumes.map((r) => (
          <div className="card" key={r._id}>
            <h3>{r.title}</h3>
            <p className="muted">
              Updated {new Date(r.updatedAt).toLocaleDateString()} · Template: {r.template}
            </p>
            <div className="card-actions">
              <button className="btn btn-sm" onClick={() => navigate(`/builder/${r._id}`)}>
                Edit
              </button>
              <button className="btn btn-sm" onClick={() => navigate('/ats', { state: { resumeId: r._id } })}>
                Score ATS
              </button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(r._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
