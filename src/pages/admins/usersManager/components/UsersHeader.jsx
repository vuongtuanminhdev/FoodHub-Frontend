import { Users } from "lucide-react";

function UsersHeader({ users }) {
  return (
    <div className="users-header">
      <div className="header-left">
        <div className="header-icon">
          <Users size={28} />
        </div>

        <div className="header-info">
          <h1>Quản lý người dùng</h1>
          <p>Quản lý tài khoản hệ thống</p>
        </div>
      </div>

      <div className="header-stats">
        <div className="stat-card">
          <div className="stat-value">{users.length}</div>
          <div className="stat-label">Tổng người dùng</div>
        </div>
      </div>
    </div>
  );
}

export default UsersHeader;