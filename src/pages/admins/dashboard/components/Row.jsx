import { useEffect, useState } from "react";
import { getToken } from "../../../../utils/auth";

function StatsGrid() {
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    fetchUsersCount();
  }, []);

  const fetchUsersCount = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/admin/users", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setUsersCount(data.length);
    } catch (error) {
      console.log("Lỗi tải số người dùng");
    }
  };

  const stats = [
    {
      icon: "👥",
      value: usersCount,
      label: "Người dùng",
      bg: "#eef2ff",
      color: "#6366f1",
    },
    {
      icon: "🏪",
      value: "48",
      label: "Nhà hàng",
      bg: "#fef3c7",
      color: "#f59e0b",
    },
    {
      icon: "🍽️",
      value: "342",
      label: "Món ăn",
      bg: "#d1fae5",
      color: "#10b981",
    },
    {
      icon: "📦",
      value: "156",
      label: "Đơn hàng",
      bg: "#fee2e2",
      color: "#ef4444",
    },
  ];

  return (
    <div className="stats-grid">
      {stats.map((s, i) => (
        <div key={i} className="stat-card">
          <div
            className="stat-icon"
            style={{
              background: s.bg,
              color: s.color,
            }}
          >
            {s.icon}
          </div>

          <div className="stat-info">
            <h3>{s.value}</h3>
            <p>{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsGrid;
