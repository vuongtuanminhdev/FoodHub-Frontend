import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";
import { getToken, getUserRole } from "./utils/auth";

// Lazy loading các pages để tối ưu performance (Code Splitting)
const Login = lazy(() => import("./pages/auth/Login.jsx"));
const Register = lazy(() => import("./pages/auth/Register.jsx"));
const Home = lazy(() => import("./pages/customer/HomeCustomer.jsx"));
const HomeAdmin = lazy(() => import("./pages/admins/dashboard/HomeAdmin.jsx"));
const AdminUsers = lazy(() => import("./pages/admins/usersManager/AdminUsers.jsx"));
const FoodsManagement = lazy(() => import("./pages/admins/foodsManager/FoodList.jsx"));

function NavigateBasedOnRole() {
  const token = getToken();
  const role = getUserRole();

  if (!token) return <Navigate to="/login" replace />;

  if (role === "ROLE_ADMIN") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Navigate to="/home" replace />;
}

// Component hiển thị trong lúc chờ tải module
const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div className="loading-spinner"></div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
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
            <Route index element={<div>Dashboard</div>} />

            {/* User Management */}
            <Route path="usersmanager" element={<AdminUsers />} />

            {/* Foods Management */}
            <Route path="foods" element={<FoodsManagement />} />
          </Route>

          {/* Default */}
          <Route path="/" element={<NavigateBasedOnRole />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;