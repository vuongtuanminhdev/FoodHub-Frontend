import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h1>Home (Protected)</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
