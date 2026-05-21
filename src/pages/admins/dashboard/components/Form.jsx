import { LogOut, LayoutDashboard } from "lucide-react";
import { getUserInfo, logout } from "../../../../utils/auth";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar({ menuItems = [] }) {
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = getUserInfo();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNavigate = (path) => {
    if (!path || location.pathname === path) return; // 🔥 tránh navigate lại
    navigate(path);
  };

  const isActiveRoute = (path) => {
    if (!path) return false;

    // 🔥 active chính xác (fix lỗi nested route)
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  return (
    <aside className="sidebar">
      {/* 🔹 HEADER */}
      <div
        className="sidebar-header"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/admin/dashboard")} // 🔥 click logo về dashboard
      >
        <div className="logo-icon">
          <LayoutDashboard size={28} />
        </div>
        <h2>
          Admin<span>Panel</span>
        </h2>
      </div>

      {/* 🔹 USER */}
      <div className="user-profile">
        <div className="avatar">
          {userInfo?.name?.charAt(0).toUpperCase() || "A"}
        </div>
        <div className="user-info">
          <h4>{userInfo?.name || "Admin User"}</h4>
        </div>
      </div>

      {/* 🔹 MENU */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const isActive = isActiveRoute(item.path);

          return (
            <div
              key={item.id}
              className={`nav-item ${isActive ? "active" : ""}`}
              onClick={() => handleNavigate(item.path)}
              style={{
                cursor: item.path ? "pointer" : "not-allowed",
                opacity: item.path ? 1 : 0.5,
              }}
            >
              <item.icon size={20} color={item.color} />
              <span>{item.name}</span>
            </div>
          );
        })}
      </nav>

      {/* 🔹 LOGOUT */}
      <button onClick={handleLogout} className="logout-btn">
        <LogOut size={18} />
        Đăng xuất
      </button>
    </aside>
  );
}

export default Sidebar;
