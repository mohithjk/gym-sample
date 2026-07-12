import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ApprovePage from './pages/ApprovePage';
import PaymentPage from './pages/PaymentPage';
import LoginPage from './pages/LoginPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false }: { children: JSX.Element, requireAdmin?: boolean }) => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" replace />;
  if (requireAdmin && user.role !== 'admin') return <Navigate to="/dashboard" replace />;
  
  return children;
};

const DashboardRouter = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  
  return user.role === 'admin' ? <AdminDashboard /> : <UserDashboard />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={<DashboardRouter />} />
        
        {/* Legacy Mock Flow Routes (Still work for public demo) */}
        <Route path="/approve" element={<ApprovePage />} />
        <Route path="/pay" element={<PaymentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
