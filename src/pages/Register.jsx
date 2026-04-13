import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState(""); // 👈 sửa
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register({ email, password }); // 👈 sửa
      alert("Register success");
      navigate("/login");
    } catch {
      alert("Register failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      {/* 👇 sửa input */}
      <input 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
      />

      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
      />

      <button onClick={handleRegister}>Register</button><br />

      <button onClick={() => navigate("/login")}>
        Go to Login
      </button>
    </div>
  );
}

export default Register;
