import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhoneAlt, FaLock, FaCheckCircle } from "react-icons/fa";
import "../styles/Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Invalid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await register({ name, email, password });
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        {/* Left side - Food Image */}
        <div className="register-image">
          <div className="food-overlay">
            <h1>FoodHub</h1>
            <p>Join us and enjoy delicious meals!</p>
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

        {/* Right side - Register Form */}
        <div className="register-form-container">
          <div className="form-wrapper">
            <div className="logo-mobile">
              <h2>🍕 FoodHub</h2>
            </div>
            <h2>Create new account</h2>
            <p className="p-welcome-text">Sign up to get special offers!</p>

            {error && <div className="error-alert">{error}</div>}

            <div className="input-field">
              <div className="input-box">
                <span className="input-icon"><FaUser /></span>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="input-field">
              <div className="input-box">
                <span className="input-icon"><FaEnvelope /></span>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>


            <div className="input-field">
              <div className="input-box">
                <span className="input-icon"><FaLock /></span>
                <input
                  type="password"
                  placeholder="Enter password (min. 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="input-field">
              <div className="input-box">
                <span className="input-icon"><FaCheckCircle /></span>
                <input
                  type="password"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleRegister()}
                  disabled={loading}
                />
              </div>
            </div>

            {/* <div className="terms">
              <label>
                <input type="checkbox" /> I agree to the
                <a href="#"> Terms of Use</a> and
                <a href="#"> Privacy Policy</a>
              </label>
            </div> */}

            <button
              className="register-btn"
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? "Processing..." : "Sign Up Now"}
            </button>

            <div className="login-link">
              <p>Already have an account? <span onClick={() => navigate("/login")}>Log in now</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;