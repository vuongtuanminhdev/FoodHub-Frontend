// pages/AdminDashboard.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfo, logout } from '../utils/auth';

function AdminDashboard() {
  const navigate = useNavigate();
  const userInfo = getUserInfo();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome, {userInfo?.name}!</p>
      <p>Email: {userInfo?.email}</p>
      <p>Role: {userInfo?.role}</p>
      
      <div className="admin-menu">
        <h2>Quản lý hệ thống</h2>
        <ul>
          <li>Quản lý người dùng</li>
          <li>Quản lý nhà hàng</li>
          <li>Quản lý món ăn</li>
          <li>Quản lý đơn hàng</li>
          <li>Thống kê báo cáo</li>
        </ul>
      </div>
      
      <button onClick={handleLogout}>Đăng xuất</button>
    </div>
  );
}

export default AdminDashboard;
    






//khhj
