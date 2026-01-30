import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../services/api-client";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const AdminProtectedRoute = () => {
    const token = getToken();
    const { user } = useContext(AuthContext);

    if (!token) return <Navigate to="/login" replace />;
    if (user?.role !== "ADMIN") return <Navigate to="/" replace />;

    return <Outlet />;
};

export default AdminProtectedRoute;