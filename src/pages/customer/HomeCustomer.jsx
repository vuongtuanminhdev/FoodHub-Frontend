import { logout } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import "../../styles/auth/Register.css";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <div className="home-header">
          <h1>🏠 Home</h1>
          <span className="protected-badge">Protected</span>
        </div>
        
        <div className="home-content">
          <p>Welcome to your dashboard!</p>
          <p className="welcome-text">
            You have successfully logged in to the protected area.
          </p>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          <span className="logout-icon">🚪</span>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;