import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/users/HomeUser";
import HomeAdmin from "./pages/admins/HomeAdmin";
import AdminUsers from "./pages/admins/usersManager/UsersManagement";
import FoodsManagement from "./pages/admins/foodsManagement/FoodList";

import ProtectedRoute from "./routes/ProtectedRoute";
import { getToken, getUserRole } from "./utils/auth";

function NavigateBasedOnRole() {
  const token = getToken();
  const role = getUserRole();

  if (!token) return <Navigate to="/login" replace />;

  if (role === "ROLE_ADMIN") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Navigate to="/home" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User */}
        <Route
          path="/home"
          element={
            <ProtectedRoute allowedRoles={["ROLE_USER"]}>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* 🔥 ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <HomeAdmin />
            </ProtectedRoute>
          }
        >
          {/* Dashboard mặc định */}
          <Route index element={<div></div>} />

          {/* User Management */}
          <Route path="usersmanager" element={<AdminUsers />} />

          {/* ✅ Foods Management */}
          <Route path="foods" element={<FoodsManagement />} />
        </Route>

        {/* Default */}
        <Route path="/" element={<NavigateBasedOnRole />} />

        {/* Fallback nếu route sai */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
