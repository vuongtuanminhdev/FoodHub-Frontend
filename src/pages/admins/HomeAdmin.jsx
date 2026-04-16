// pages/HomeAdmin.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfo, logout } from '../../utils/auth';
import "../../styles/admins/HomeAdmin.css";

// Icon components (có thể thay bằng react-icons nếu muốn)
import {
  Users,
  Store,
  UtensilsCrossed,
  ShoppingBag,
  BarChart3,
  LogOut,
  LayoutDashboard
} from 'lucide-react';

function AdminDashboard() {
  const navigate = useNavigate();
  const userInfo = getUserInfo();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { id: 1, name: "Quản lý người dùng", icon: Users, color: "#6366f1" },
    { id: 2, name: "Quản lý nhà hàng", icon: Store, color: "#f59e0b" },
    { id: 3, name: "Quản lý món ăn", icon: UtensilsCrossed, color: "#10b981" },
    { id: 4, name: "Quản lý đơn hàng", icon: ShoppingBag, color: "#ef4444" },
    { id: 5, name: "Thống kê báo cáo", icon: BarChart3, color: "#8b5cf6" }
  ];

  return (
    <div className="admin-dashboard">
      {/* Background decoration */}
      <div className="bg-blur-1"></div>
      <div className="bg-blur-2"></div>
      
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-icon">
            <LayoutDashboard size={28} />
          </div>
          <h2>Admin<span>Panel</span></h2>
        </div>
        
        <div className="user-profile">
          <div className="avatar">
            {userInfo?.name?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="user-info">
            <h4>{userInfo?.name || "Admin User"}</h4>
            <p>{userInfo?.role || "Administrator"}</p>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <div key={item.id} className="nav-item">
              <item.icon size={20} color={item.color} />
              <span>{item.name}</span>
            </div>
          ))}
        </nav>
        
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={18} />
          Đăng xuất
        </button>
      </aside>
      
      {/* Main content */}
      <main className="main-content">
        <div className="top-bar">
          <div className="welcome-section">
            <h1>Xin chào, {userInfo?.name?.split(' ').pop() || "Admin"}! 👋</h1>
            <p>Chào mừng bạn quay trở lại. Dưới đây là tổng quan hệ thống hôm nay.</p>
          </div>
          <div className="date-time">
            {new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#eef2ff", color: "#6366f1" }}>👥</div>
            <div className="stat-info">
              <h3>1,284</h3>
              <p>Người dùng</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#fef3c7", color: "#f59e0b" }}>🏪</div>
            <div className="stat-info">
              <h3>48</h3>
              <p>Nhà hàng</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#d1fae5", color: "#10b981" }}>🍽️</div>
            <div className="stat-info">
              <h3>342</h3>
              <p>Món ăn</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#fee2e2", color: "#ef4444" }}>📦</div>
            <div className="stat-info">
              <h3>156</h3>
              <p>Đơn hàng hôm nay</p>
            </div>
          </div>
        </div>
        
        <div className="recent-section">
          <div className="recent-header">
            <h2>Hoạt động gần đây</h2>
            <button className="view-all">Xem tất cả</button>
          </div>
          <div className="activity-list">
            {[1,2,3,4].map((i) => (
              <div key={i} className="activity-item">
                <div className="activity-dot"></div>
                <div className="activity-detail">
                  <p><strong>Người dùng mới</strong> đã đăng ký tài khoản</p>
                  <span>5 phút trước</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
