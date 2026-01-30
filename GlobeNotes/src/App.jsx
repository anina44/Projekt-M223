import "./App.css";
import Home from "./pages/Home";
import Hinzufügen from "./pages/Hinzufügen";
import Reiseziel from "./pages/Reiseziel";
import Layout from "./pages/Layout";
import WeltkartePage from "./pages/WeltkartePage";
import Login from "./pages/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import AdminProtectedRoute from "./auth/AdminProtectedRoute";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* public */}
                <Route index element={<Navigate to="/login" replace />} />
                <Route path="login" element={<Login />} />

                {/* protected */}
                <Route element={<ProtectedRoute />}>
                    <Route path="home" element={<Home />} />
                    <Route path="hinzufuegen" element={<Hinzufügen />} />
                    <Route path="weltkartepage" element={<WeltkartePage />} />
                </Route>

                {/* admin only */}
                <Route element={<AdminProtectedRoute />}>
                    <Route path="reiseziele" element={<Reiseziel />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
