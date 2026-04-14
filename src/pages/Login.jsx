import { useState } from "react";
import { login } from "../services/authService";
import { saveToken, saveUserInfo } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { 
  FaUser, FaLock, FaPizzaSlice, FaHamburger, 
  FaUtensils, FaLeaf, FaFish, FaGoogle, FaFacebook,
  FaEye, FaEyeSlash 
} from "react-icons/fa";
import "../styles/Login.css";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!name || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      // 🔥 SỬA: login trả về object đầy đủ { token, role, email, name }
      const response = await login({ 
        email: name, 
        password 
      });

      // Lưu token
      saveToken(response.token);
      
      // Lưu thông tin user (bao gồm role)
      saveUserInfo({
        email: response.email,
        name: response.name,
        role: response.role
      });

      // 🎯 ĐIỀU HƯỚNG DỰA TRÊN ROLE
      if (response.role === 'ROLE_ADMIN') {
        navigate('/admin/dashboard');  // Điều hướng sang trang admin
      } else if (response.role === 'ROLE_USER') {
        navigate('/home');  // Điều hướng sang trang user
      } else {
        navigate('/home');  // Mặc định về home
      }
      
    } catch (err) {
      setError(err.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        {/* Left side */}
        <div className="login-image">
          <div className="food-overlay">
            <h1>FoodHub</h1>
            <p>Delicious food delivered to your doorstep</p>
            <div className="food-icons">
              <FaPizzaSlice />
              <FaHamburger />
              <FaUtensils />
              <FaLeaf />
              <FaFish />
            </div>
            <div className="stats">
              <div className="stat">
                <h3>500+</h3>
                <p>Restaurants</p>
              </div>
              <div className="stat">
                <h3>1000+</h3>
                <p>Food Items</p>
              </div>
              <div className="stat">
                <h3>50k+</h3>
                <p>Happy Customers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="login-form-container">
          <div className="form-wrapper">
            <div className="logo-mobile">
              <h2>🍕 FoodHub</h2>
            </div>
            <h2>Welcome back!</h2>
            <p className="p-welcome-text">Log in to order food now!</p>

            {error && <div className="error-alert">{error}</div>}

            {/* Email field */}
            <div className="input-field">
              <div className="input-box">
                <span className="input-icon"><FaUser /></span>
                <input
                  type="text"
                  placeholder="Enter email"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password field */}
            <div className="input-field">
              <div className="input-box">
                <span className="input-icon"><FaLock /></span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                  disabled={loading}
                />
                <button 
                  type="button"
                  className="password-toggle-btn"
                  onClick={togglePasswordVisibility}
                  tabIndex={-1}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="forgot-password">
              <a href="#">Forgot password?</a>
            </div>

            <button 
              className="login-btn" 
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="register-link">
              <p>
                Don't have an account?{" "}
                <span onClick={() => navigate("/register")}>
                  Sign up now
                </span>
              </p>
            </div>

            <div className="or-divider">
              <span>Or login with</span>
            </div>

            <div className="social-login">
              <button className="social-btn google">
                <FaGoogle /> Google
              </button>
              <button className="social-btn facebook">
                <FaFacebook /> Facebook
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;