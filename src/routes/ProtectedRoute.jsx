// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { getToken, getUserRole } from '../utils/auth';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = getToken();
  const userRole = getUserRole();

  // Chưa đăng nhập
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Nếu có yêu cầu role cụ thể và user không có role đó
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // Điều hướng về trang phù hợp với role
    if (userRole === 'ROLE_ADMIN') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;