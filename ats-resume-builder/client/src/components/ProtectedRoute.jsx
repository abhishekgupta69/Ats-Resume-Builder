import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Redirects to /login if the user is not authenticated
export default function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.auth);
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
