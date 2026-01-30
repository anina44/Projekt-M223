import { useEffect, useState, useContext } from "react";
import Weltkarte from "../components/Weltkarte";
import api from "../services/api-client"; // 👈 wichtig
import { AuthContext } from "../auth/AuthContext";

// Diese Seite zeigt die Weltkarte mit den Reisezielen an
export default function WeltkartePage() {
    const [reiseziele, setReiseziele] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        api
            .get("/api/reiseziele") // 👈 gleicher Endpoint wie Home
            .then((res) => {
                const data = res.data;
                console.log("Geladene Daten (Weltkarte):", data);
                setReiseziele(Array.isArray(data) ? data : []);
            })
            .catch((err) => {
                console.error(
                    "Fehler beim Laden (Weltkarte):",
                    err?.response?.status,
                    err?.response?.data || err.message
                );
                setReiseziele([]);
            });
    }, []);

    return (
        <div>
            <Weltkarte reiseziele={reiseziele} />
        </div>
    );
}
