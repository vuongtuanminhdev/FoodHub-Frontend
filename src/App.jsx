// App.js
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { getToken, getUserRole } from './utils/auth';

// Component điều hướng mặc định
function NavigateBasedOnRole() {
  const token = getToken();
  const role = getUserRole();
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  if (role === 'ROLE_ADMIN') {
    return <Navigate to="/admin/dashboard" replace />;
  }
  
  return <Navigate to="/home" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Route cho User */}
        <Route path="/home" element={
          <ProtectedRoute allowedRoles={['ROLE_USER']}>
            <Home />
          </ProtectedRoute>
        } />
        
        {/* Route cho Admin */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        
        {/* Mặc định */}
        <Route path="/" element={<NavigateBasedOnRole />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;