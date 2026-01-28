import "./App.css";
import Home from "./pages/Home";
import Hinzufügen from "./pages/Hinzufügen";
import Reiseziel from "./pages/Reiseziel";
import Layout from "./pages/Layout";
import WeltkartePage from "./pages/WeltkartePage";
import Login from "./pages/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* public */}
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />

                {/* protected */}
                <Route element={<ProtectedRoute />}>
                    <Route path="hinzufuegen" element={<Hinzufügen />} />
                    <Route path="reiseziel" element={<Reiseziel />} />
                    <Route path="weltkartepage" element={<WeltkartePage />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
