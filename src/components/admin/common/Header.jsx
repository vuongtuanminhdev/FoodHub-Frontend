// src/components/common/Header.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout, getUserInfo } from "../../../utils/auth";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const userInfo = getUserInfo();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="admin-header">
      <div className="header-left">
        <div className="logo">
          <h2>Admin Dashboard</h2>
        </div>
      </div>

      <div className="header-right">
        <div className="user-menu">
          <span className="user-name">{userInfo?.name || "Admin"}</span>
          <div 
            className="avatar" 
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {userInfo?.name?.charAt(0) || "A"}
          </div>
          
          {showDropdown && (
            <div className="dropdown-menu">
              <button onClick={() => navigate("/admin/profile")}>
                <i className="icon-profile"></i> Hồ sơ
              </button>
              <button onClick={handleLogout}>
                <i className="icon-logout"></i> Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;