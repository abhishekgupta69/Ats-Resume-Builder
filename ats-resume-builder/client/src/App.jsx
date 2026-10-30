import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './store/authSlice';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Builder from './pages/Builder';
import ATSChecker from './pages/ATSChecker';

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <nav className="navbar no-print">
      <Link to="/dashboard" className="brand">
        Resume<span>ATS</span>
      </Link>
      {user && (
        <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/builder">New Resume</Link>
          <Link to="/ats">ATS Checker</Link>
          <span className="nav-user">Hi, {user.name}</span>
          <button
            className="btn btn-ghost"
            onClick={() => {
              dispatch(logout());
              navigate('/login');
            }}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Navigate to="/dashboard" replace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/builder"
            element={
              <ProtectedRoute>
                <Builder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/builder/:id"
            element={
              <ProtectedRoute>
                <Builder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ats"
            element={
              <ProtectedRoute>
                <ATSChecker />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}
