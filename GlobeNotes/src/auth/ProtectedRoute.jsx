import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../services/api-client";

const ProtectedRoute = () => {
    const token = getToken();
    if (!token) return <Navigate to="/login" replace />;
    return <Outlet />;
};

export default ProtectedRoute;
