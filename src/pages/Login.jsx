import { useState } from "react";
import { login } from "../services/authService";
import { saveToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login({ name, password });

      saveToken(res.data); // lưu JWT
      alert("Login success");

      navigate("/home");
    } catch (err) {
      alert("Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button><br></br>
      <button onClick={() => navigate("/register")}>Go to Register</button>
    </div>
  );
}

export default Login;