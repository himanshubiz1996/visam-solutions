import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children }) {
  const { user, loading, isAdmin } = useAuth();

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-night flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon"></div>
      </div>
    );
  }

  // Not authenticated or not admin
  if (!user || !isAdmin()) {
    return <Navigate to="/admin/login" replace />;
  }

  // Authenticated and admin
  return children;
}
    