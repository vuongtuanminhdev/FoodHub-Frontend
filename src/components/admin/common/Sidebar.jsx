// src/components/common/Sidebar.jsx
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const menuItems = [
    { path: "/admin/users", icon: "👥", label: "Quản lý Users" },
    { path: "/admin/products", icon: "📦", label: "Quản lý Sản phẩm" },
    { path: "/admin/orders", icon: "🛒", label: "Quản lý Đơn hàng" },
    { path: "/admin/stats", icon: "📊", label: "Thống kê" },
  ];

  return (
    <aside className="admin-sidebar">
      <nav>
        {menuItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path}
            className={({ isActive }) => isActive ? "active" : ""}
          >
            <span className="icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;