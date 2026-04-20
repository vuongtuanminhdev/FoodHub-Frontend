// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { isAuthenticated, isAdmin } from "../utils/auth";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const authenticated = isAuthenticated();
    const admin = isAdmin();
    
    console.log("ProtectedRoute check:", { authenticated, admin, requireAdmin });
    
    if (!authenticated) {
        console.warn("Not authenticated, redirecting to login");
        return <Navigate to="/login" replace />;
    }
    
    if (requireAdmin && !admin) {
        console.warn("Not admin, redirecting to home");
        return <Navigate to="/home" replace />;
    }
    
    return children;
};

export default ProtectedRoute;