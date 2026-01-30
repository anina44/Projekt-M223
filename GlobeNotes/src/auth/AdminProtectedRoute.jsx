import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../services/api-client";

const AdminProtectedRoute = () => {
    const token = getToken();

    if (!token) return <Navigate to="/login" replace />;

    // Decode token to get role
    let userRole = null;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        userRole = payload.role;
    } catch (error) {
        console.error("Failed to decode token:", error);
        return <Navigate to="/login" replace />;
    }

    if (userRole !== "ADMIN") return <Navigate to="/home" replace />;

    return <Outlet />;
};

export default AdminProtectedRoute;