import "../../styles/admin/HomeAdmin.css";
import { getUserInfo } from "../../utils/auth";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "../../components/admin/dashboard/UserForm";
import Header from "../../components/admin/dashboard/UsersTable";
import StatsGrid from "../../components/admin/dashboard/UserRow";
import RecentActivity from "../../components/admin/dashboard/UserFilter";

import {
  Users,
  Store,
  UtensilsCrossed,
  ShoppingBag,
  BarChart3,
} from "lucide-react";

function HomeAdmin() {
  const userInfo = getUserInfo();
  const location = useLocation();

  const isDashboard = location.pathname === "/admin/dashboard";

  const menuItems = [
    {
      id: 1,
      name: "Quản lý người dùng",
      icon: Users,
      color: "#6366f1",
      path: "/admin/dashboard/usersmanager",
    },
    {
      id: 2,
      name: "Quản lý nhà hàng",
      icon: Store,
      color: "#f59e0b",
      path: "/admin/dashboard/restaurants",
    },
    {
      id: 3,
      name: "Quản lý món ăn",
      icon: UtensilsCrossed,
      color: "#10b981",
      path: "/admin/dashboard/foods",
    },
    {
      id: 4,
      name: "Quản lý đơn hàng",
      icon: ShoppingBag,
      color: "#ef4444",
      path: "/admin/dashboard/orders",
    },
    {
      id: 5,
      name: "Thống kê báo cáo",
      icon: BarChart3,
      color: "#8b5cf6",
      path: "/admin/dashboard/reports",
    },
  ];

  return (
    <div className="admin-dashboard">
      <Sidebar menuItems={menuItems} />

      <main className="main-content">
        <Header userInfo={userInfo} />

        {isDashboard && (
          <>
            <StatsGrid />
            <RecentActivity />
          </>
        )}

        {/* 🔥 render page con */}
        <Outlet />
      </main>
    </div>
  );
}

export default HomeAdmin;
